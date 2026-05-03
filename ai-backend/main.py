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
    "You are D-Lite AI, a helpful assistant built into a real-time messaging platform. "
    "Help users manage conversations, summarize chats, draft messages, and answer questions. "
    "Be concise, friendly, and useful."
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
    voice_id: Optional[str] = "21m00Tcm4TlvDq8ikWAM"  # ElevenLabs Rachel


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
        if req.model == "gpt":
            import openai
            client = openai.AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
            response = await client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "system", "content": SYSTEM_PROMPT}, *history],
                max_tokens=1024,
            )
            return {"content": response.choices[0].message.content}

        else:  # claude (default)
            import anthropic
            client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
            response = client.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=1024,
                system=SYSTEM_PROMPT,
                messages=history,
            )
            return {"content": response.content[0].text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Chat (streaming SSE) ──────────────────────────────────────────────────────

@app.post("/chat/stream")
async def chat_stream(req: ChatRequest):
    history = [{"role": m.role, "content": m.content} for m in (req.history or [])]
    history.append({"role": "user", "content": req.message})

    async def generate():
        try:
            import anthropic
            client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
            with client.messages.stream(
                model="claude-sonnet-4-6",
                max_tokens=1024,
                system=SYSTEM_PROMPT,
                messages=history,
            ) as stream:
                for text in stream.text_stream:
                    yield f"data: {json.dumps({'delta': text})}\n\n"
            yield f"data: {json.dumps({'done': True})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ── Text-to-Speech (ElevenLabs) ───────────────────────────────────────────────

@app.post("/tts")
async def tts(req: TTSRequest):
    try:
        from elevenlabs.client import ElevenLabs
        client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))
        audio_gen = client.generate(
            text=req.text,
            voice=req.voice_id,
            model="eleven_multilingual_v2",
        )
        audio_bytes = b"".join(audio_gen)
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
        options = PrerecordedOptions(model="nova-2", smart_format=True, language="en")
        response = client.listen.prerecorded.v("1").transcribe_file(
            {"buffer": body, "mimetype": content_type}, options
        )
        transcript = response.results.channels[0].alternatives[0].transcript
        return {"transcript": transcript}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
