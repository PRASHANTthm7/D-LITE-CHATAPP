import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio

load_dotenv()

ALLOWED_ORIGINS = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "*").split(",")]

sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*" if ALLOWED_ORIGINS == ["*"] else ALLOWED_ORIGINS,
)

app = FastAPI(title="D-Lite Realtime Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if ALLOWED_ORIGINS == ["*"] else ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

socket_app = socketio.ASGIApp(sio, other_asgi_app=app)

# sid → user_id
_online: dict[str, str] = {}


# ── Health ────────────────────────────────────────────────────────────────────

@app.get("/health")
async def health():
    return {"status": "ok", "online": len(_online)}


# ── Connection lifecycle ───────────────────────────────────────────────────────

@sio.event
async def connect(sid, environ, auth):
    user_id = (auth or {}).get("user_id")
    if not user_id:
        return  # anonymous — still connected but not tracked
    _online[sid] = user_id
    await sio.enter_room(sid, f"user:{user_id}")
    # Broadcast to everyone else that this user came online
    await sio.emit("user_online", {"user_id": user_id}, skip_sid=sid)


@sio.event
async def disconnect(sid):
    user_id = _online.pop(sid, None)
    if user_id:
        await sio.emit("user_offline", {"user_id": user_id}, skip_sid=sid)


# ── Room management ───────────────────────────────────────────────────────────

@sio.event
async def join_room(sid, data):
    """data: { room: "dm:<id1>_<id2>" | "group:<group_id>" }"""
    room = (data or {}).get("room")
    if room:
        await sio.enter_room(sid, room)


@sio.event
async def leave_room(sid, data):
    room = (data or {}).get("room")
    if room:
        await sio.leave_room(sid, room)


# ── Typing indicators ─────────────────────────────────────────────────────────

@sio.event
async def typing_start(sid, data):
    """data: { room: str }"""
    room = (data or {}).get("room")
    user_id = _online.get(sid)
    if room and user_id:
        await sio.emit("typing_start", {"user_id": user_id}, room=room, skip_sid=sid)


@sio.event
async def typing_stop(sid, data):
    """data: { room: str }"""
    room = (data or {}).get("room")
    user_id = _online.get(sid)
    if room and user_id:
        await sio.emit("typing_stop", {"user_id": user_id}, room=room, skip_sid=sid)


# ── Presence ──────────────────────────────────────────────────────────────────

@sio.event
async def get_online_users(sid, data):
    """Return list of all currently-online user IDs to the caller."""
    await sio.emit("online_users", {"users": list(set(_online.values()))}, to=sid)


@sio.event
async def ping(sid, data):
    await sio.emit("pong", {}, to=sid)
