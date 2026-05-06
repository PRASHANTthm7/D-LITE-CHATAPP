import os
import json
from dotenv import load_dotenv
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional

load_dotenv()

ALLOWED_ORIGINS = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "*").split(",")]

app = FastAPI(title="D-Lite AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if ALLOWED_ORIGINS == ["*"] else ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYSTEM_PROMPT = (
    "You're talking with D-Lite — a friendly, down-to-earth assistant and teammate. "
    "Speak like a helpful friend: be casual, supportive, and concise. "
    "Help users manage conversations, summarize chats, draft messages, and answer questions."
)


# ── Models ────────────────────────────────────────────────────────────────────

class MessageItem(BaseModel):
    role: str        # "user" | "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[list[MessageItem]] = []
    model: Optional[str] = "claude"   # "claude" | "gpt"
    stream: Optional[bool] = False

class TTSRequest(BaseModel):
    text: str
    voice_id: Optional[str] = None


# ── Health ────────────────────────────────────────────────────────────────────

@app.get("/health")
async def health():
    return {"status": "ok", "service": "ai-backend"}


# ── Chat (non-streaming) ──────────────────────────────────────────────────────

@app.post("/chat")
async def chat(req: ChatRequest):
    history = [{"role": m.role, "content": m.content} for m in (req.history or [])]
    history.append({"role": "user", "content": req.message})

    try:
        import httpx
        key = os.getenv("OPENROUTER_API_KEY")
        if not key:
            raise HTTPException(status_code=500, detail="OPENROUTER_API_KEY not configured")

        model = os.getenv("OPENROUTER_MODEL", "nvidia/nemotron-3-super-120b-a12b:free")
        url = "https://api.openrouter.ai/v1/chat/completions"
        headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}
        payload = {
            "model": model,
            "messages": [{"role": "system", "content": SYSTEM_PROMPT}, *history],
            "max_tokens": 1024,
        }

        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(url, json=payload, headers=headers)
            resp.raise_for_status()
            data = resp.json()

        # Try to extract chat content using common OpenAI/OpenRouter response shapes
        content = None
        try:
            content = data["choices"][0]["message"]["content"]
        except Exception:
            try:
                content = data["choices"][0].get("text")
            except Exception:
                content = json.dumps(data)

        return {"content": content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Chat (streaming SSE) ──────────────────────────────────────────────────────

@app.post("/chat/stream")
async def chat_stream(req: ChatRequest):
    history = [{"role": m.role, "content": m.content} for m in (req.history or [])]
    history.append({"role": "user", "content": req.message})

    async def generate():
        try:
            import httpx
            key = os.getenv("OPENROUTER_API_KEY")
            if not key:
                yield f"data: {json.dumps({'error': 'OPENROUTER_API_KEY not configured'})}\n\n"
                return

            model = os.getenv("OPENROUTER_MODEL", "nvidia/nemotron-3-super-120b-a12b:free")
            url = "https://api.openrouter.ai/v1/chat/completions"
            headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}
            payload = {
                "model": model,
                "messages": [{"role": "system", "content": SYSTEM_PROMPT}, *history],
                "max_tokens": 1024,
                "stream": True,
            }

            async with httpx.AsyncClient(timeout=None) as client:
                async with client.stream("POST", url, json=payload, headers=headers) as resp:
                    async for chunk in resp.aiter_text():
                        if not chunk:
                            continue
                        yield f"data: {json.dumps({'delta': chunk})}\n\n"

            yield f"data: {json.dumps({'done': True})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ── Text-to-Speech (Deepgram) ───────────────────────────────────────────────

@app.post("/tts")
async def tts(req: TTSRequest):
    try:
        import httpx
        dg_key = os.getenv("DEEPGRAM_API_KEY")
        if not dg_key:
            raise HTTPException(status_code=500, detail="DEEPGRAM_API_KEY not configured")

        voice = req.voice_id or os.getenv("DEEPGRAM_TTS_VOICE", "alloy")
        model = os.getenv("DEEPGRAM_TTS_MODEL", "gpt-tts")

        url = f"https://api.deepgram.com/v1/text-to-speech?voice={voice}&model={model}&format=mp3"
        headers = {"Authorization": f"Token {dg_key}", "Content-Type": "application/json"}
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(url, json={"text": req.text}, headers=headers)
            resp.raise_for_status()
            audio_bytes = resp.content

        return StreamingResponse(
            iter([audio_bytes]),
            media_type="audio/mpeg",
            headers={"Content-Disposition": "inline; filename=speech.mp3"},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Speech-to-Text (Deepgram) ─────────────────────────────────────────────────

@app.post("/stt")
async def stt(request: Request):
    try:
        from deepgram import DeepgramClient, PrerecordedOptions
        body = await request.body()
        content_type = request.headers.get("content-type", "audio/webm")

        client = DeepgramClient(api_key=os.getenv("DEEPGRAM_API_KEY"))
        stt_model = os.getenv("DEEPGRAM_STT_MODEL", "nova-2")
        options = PrerecordedOptions(model=stt_model, smart_format=True, language="en")
        response = client.listen.prerecorded.v("1").transcribe_file(
            {"buffer": body, "mimetype": content_type}, options
        )
        transcript = response.results.channels[0].alternatives[0].transcript
        return {"transcript": transcript}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
