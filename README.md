# D-Lite

A production-grade real-time communication platform with chat, group messaging, voice/video calls, and an AI assistant — built as a microservices architecture.

## Features

- **Real-time DMs** — direct messaging with reactions, replies, read receipts
- **Group Chat** — create groups, role-based members (Owner/Admin/Moderator/Member)
- **Voice & Video Calls** — WebRTC-powered via ZEGOCLOUD, secure server-side token generation
- **AI Assistant** — Claude + OpenAI chat with streaming, Deepgram STT, ElevenLabs TTS
- **Live Presence** — online status, typing indicators via Socket.IO
- **Media Uploads** — avatar and attachment uploads via Cloudinary
- **Auth** — Supabase Auth with email/password, gender & avatar on signup, 2FA, password reset
- **Theming** — light/dark mode with custom brand colors

## Architecture

| Service | Tech | Port | Responsibility |
|---|---|---|---|
| `frontend-service` | Next.js 16, Tailwind, Supabase SSR | 3000 | UI, Auth, SSR |
| `core-backend` | FastAPI, Supabase Python client | 5040 | Users, Groups, Calls |
| `realtime-service` | FastAPI, Socket.IO | 5050 | Presence, Typing, Rooms |
| `call-service` | Node.js, Express, ZEGOCLOUD | 5060 | Secure Token Generation |
| `ai-backend` | FastAPI, Anthropic, OpenAI | 5070 | AI Chat, STT, TTS |

```
┌─────────────────────────────────────────┐
│              Browser / Client           │
└────────┬────────────────────────────────┘
         │
┌────────▼────────┐
│ frontend-service│  Next.js (SSR + CSR)
│  :3000 / Vercel │  Supabase Realtime (WS)
└────────┬────────┘
         │ REST / WS
    ┌────┴──────────────────────────┐
    │                               │
┌───▼──────────┐  ┌───────────────┐│
│ core-backend │  │realtime-svc   ││
│   :5040      │  │   :5050       ││
└──────────────┘  └───────────────┘│
    │                               │
┌───▼──────────┐  ┌───────────────┐│
│ call-service │  │  ai-backend   ││
│   :5060      │  │   :5070       ││
└──────────────┘  └───────────────┘│
         │                         │
┌────────▼─────────────────────────▼────┐
│            Supabase (Postgres + Auth)  │
└───────────────────────────────────────┘
```

## API Reference

### `core-backend` — :5040

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/users/search?q=&limit=` | Search users by username/display_name |
| GET | `/users/:id` | Get user profile |
| PATCH | `/users/:id` | Update profile fields |
| GET | `/users/:id/conversations` | Latest DM per peer |
| GET | `/users/:id/groups` | All groups for a user |
| GET | `/groups/:id` | Group detail with members |
| POST | `/groups` | Create a group |
| POST | `/calls` | Log a call |
| GET | `/users/:id/calls` | Call history |

### `realtime-service` — :5050 (Socket.IO)

| Event (emit) | Payload | Description |
|---|---|---|
| `connect` | `auth: { user_id }` | Connect & announce presence |
| `join_room` | `{ room }` | Join `dm:<id>` or `group:<id>` |
| `leave_room` | `{ room }` | Leave room |
| `typing_start` | `{ room }` | Start typing in room |
| `typing_stop` | `{ room }` | Stop typing |
| `get_online_users` | — | Get list of online user IDs |

| Event (listen) | Payload | Description |
|---|---|---|
| `user_online` | `{ user_id }` | User came online |
| `user_offline` | `{ user_id }` | User went offline |
| `typing_start` | `{ user_id }` | Someone is typing |
| `typing_stop` | `{ user_id }` | Someone stopped typing |
| `online_users` | `{ users: [] }` | Response to get_online_users |

### `call-service` — :5060

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/token?roomId=&userId=&userName=` | Generate secure ZEGOCLOUD kit token |

### `ai-backend` — :5070

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/chat` | Non-streaming chat (Claude or GPT) |
| POST | `/chat/stream` | Streaming SSE chat (Claude) |
| POST | `/tts` | Text-to-Speech (ElevenLabs) |
| POST | `/stt` | Speech-to-Text (Deepgram) |

**`POST /chat` body:**
```json
{ "message": "...", "history": [{"role": "user", "content": "..."}], "model": "claude" }
```

**`POST /chat/stream`** — returns `text/event-stream`:
```
data: {"delta": "Hello"}
data: {"delta": " world"}
data: {"done": true}
```

## Tech Stack

**Frontend**
- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4 + Framer Motion
- Supabase JS (Auth + Realtime + Database)
- Cloudinary (media uploads via CldUploadWidget)
- ZEGOCLOUD (WebRTC calls)

**Backend**
- Python 3.12 / FastAPI / Uvicorn
- Node.js 20 / Express / TypeScript
- Supabase (Postgres, Row Level Security, Realtime)
- Anthropic Claude / OpenAI / Deepgram / ElevenLabs

## Local Development

### Prerequisites
- Docker & Docker Compose
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- Node.js 20+ / Python 3.12+

### 1. Clone and setup

```bash
git clone https://github.com/your-username/d-lite.git
cd d-lite
```

### 2. Start Supabase locally

```bash
npx supabase start
```

Copy the output keys into `frontend-service/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from supabase start>
```

### 3. Apply database migrations

```bash
npx supabase db push
```

### 4. Configure environment

Each service has a `.env.example` — copy and fill in:

```bash
cp ai-backend/.env.example ai-backend/.env
cp core-backend/.env.example core-backend/.env
cp realtime-service/.env.example realtime-service/.env
cp call-service/.env.example call-service/.env
```

### 5. Start all services

```bash
docker compose up
```

| URL | Service |
|---|---|
| http://localhost:3000 | Frontend |
| http://localhost:5040 | Core Backend |
| http://localhost:5050 | Realtime Service |
| http://localhost:5060 | Call Service |
| http://localhost:5070 | AI Backend |
| http://localhost:54323 | Supabase Studio |

## Environment Variables

### Frontend (`frontend-service/.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_ZEGO_APP_ID=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CORE_API_URL=http://localhost:5040
NEXT_PUBLIC_REALTIME_WS_URL=ws://localhost:5050
NEXT_PUBLIC_CALLS_API_URL=http://localhost:5060
NEXT_PUBLIC_AI_API_URL=http://localhost:5070
```

> **Note:** `NEXT_PUBLIC_ZEGO_SERVER_SECRET` is no longer needed in the frontend — the call-service handles token generation securely.

### Backend services (common)

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ALLOWED_ORIGINS=http://localhost:3000
```

### AI Backend additional

```env
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
DEEPGRAM_API_KEY=
ELEVENLABS_API_KEY=
```

### Call Service additional

```env
ZEGO_APP_ID=
ZEGO_SERVER_SECRET=
```

## Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| core-backend, realtime-service, ai-backend | Render (Python) |
| call-service | Render (Node.js) |
| Database & Auth | Supabase |

### Vercel (Frontend)

Set these in Vercel → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL          → Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY     → Supabase anon key
NEXT_PUBLIC_ZEGO_APP_ID           → ZEGOCLOUD App ID
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME → Cloudinary cloud name
NEXT_PUBLIC_CORE_API_URL          → Render URL of core-backend
NEXT_PUBLIC_REALTIME_WS_URL       → Render URL of realtime-service
NEXT_PUBLIC_CALLS_API_URL         → Render URL of call-service
NEXT_PUBLIC_AI_API_URL            → Render URL of ai-backend
```

### Render (Backend Services)

Deploy each as a separate **Web Service**.

| Service | Runtime | Start command |
|---|---|---|
| `core-backend` | Python 3.12 | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| `ai-backend` | Python 3.12 | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| `realtime-service` | Python 3.12 | `uvicorn main:socket_app --host 0.0.0.0 --port $PORT` |
| `call-service` | Node 20 | `npm run build && npm start` |

## Project Structure

```
d-lite/
├── frontend-service/       # Next.js 16 app
│   └── src/
│       ├── app/            # Pages (App Router)
│       │   ├── page.tsx    # Landing page
│       │   ├── (auth)/     # Login, Signup, Reset
│       │   └── (app)/      # Dashboard, Chat, Groups, Calls, AI, Settings
│       ├── features/       # Feature modules
│       ├── core/           # Auth clients, data fetchers
│       └── shared/         # Reusable UI components
├── core-backend/           # FastAPI — profiles, groups, calls
├── realtime-service/       # FastAPI + Socket.IO — presence, typing
├── call-service/           # Node.js + Express — ZEGOCLOUD token
├── ai-backend/             # FastAPI — Claude/GPT, Deepgram, ElevenLabs
├── docs/
│   └── SCHEMA.md           # Full database schema reference
├── supabase/
│   └── migrations/         # SQL migrations
└── docker-compose.yml
```

## License

MIT
