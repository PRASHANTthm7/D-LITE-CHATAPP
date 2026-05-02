# D-Lite

A production-grade real-time communication platform with chat, group messaging, voice/video calls, and an AI assistant — built as a microservices architecture.

## Features

- **Real-time DMs** — direct messaging with reactions, replies, read receipts
- **Group Chat** — create groups, role-based members (owner/admin/mod/member)
- **Voice & Video Calls** — WebRTC-powered via ZEGOCLOUD
- **AI Assistant** — Claude + OpenAI + Deepgram (voice) + ElevenLabs (TTS)
- **Live Presence** — online status, typing indicators via Socket.IO
- **Media Uploads** — avatar and attachment uploads via Cloudinary
- **Auth** — Supabase Auth with email/password, 2FA settings, password reset
- **Theming** — light/dark mode with custom brand colors

## Architecture

| Service | Tech | Port | Responsibility |
|---|---|---|---|
| `frontend-service` | Next.js 16, Tailwind, Supabase SSR | 3000 | UI, Auth, SSR |
| `core-backend` | FastAPI, SQLAlchemy, Supabase | 5040 | Users, Messages, Groups |
| `realtime-service` | FastAPI, Socket.IO | 5050 | Presence, Typing, Events |
| `call-service` | Node.js, Express, ZEGOCLOUD | 5060 | WebRTC Signaling |
| `ai-backend` | FastAPI, Anthropic, OpenAI | 5070 | AI Assistant, STT, TTS |

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

## Tech Stack

**Frontend**
- Next.js 16 (App Router, Turbopack)
- Tailwind CSS + Framer Motion
- Supabase JS (Auth + Realtime + Database)
- Cloudinary (media uploads)
- ZEGOCLOUD (WebRTC calls)

**Backend**
- Python 3.12 / FastAPI / Uvicorn
- Node.js 20 / Express
- Supabase (Postgres, Row Level Security, Realtime)
- Anthropic Claude / OpenAI / Deepgram / ElevenLabs

## Local Development

### Prerequisites
- Docker & Docker Compose
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- Node.js 20+

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

Copy and fill in the env file:

```bash
cp .env.example .env
```

Edit `.env` and fill in your keys (Zego, Cloudinary, AI APIs).

### 5. Start all services

```bash
docker compose up
```

| URL | Service |
|---|---|
| http://localhost:3002 | Frontend |
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
NEXT_PUBLIC_ZEGO_SERVER_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

### Backend services

```env
DATABASE_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
```

## Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| core-backend, realtime-service, ai-backend, call-service | Render |
| Database & Auth | Supabase |

### Vercel (Frontend)

Set these in Vercel → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL        → your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY   → Supabase anon/publishable key
NEXT_PUBLIC_ZEGO_APP_ID         → ZEGOCLOUD App ID
NEXT_PUBLIC_ZEGO_SERVER_SECRET  → ZEGOCLOUD Server Secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME → Cloudinary cloud name
```

### Render (Backend Services)

Deploy each service as a separate **Web Service**. Set `PORT` is auto-provided by Render.

Start commands:
- `core-backend` / `ai-backend`: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- `realtime-service`: `uvicorn main:socket_app --host 0.0.0.0 --port $PORT`
- `call-service`: `npm start`

## Project Structure

```
d-lite/
├── frontend-service/       # Next.js app
│   └── src/
│       ├── app/            # Pages (App Router)
│       │   ├── (auth)/     # Login, Signup, Reset
│       │   └── (app)/      # Dashboard, Chat, Groups, Calls, AI, Settings
│       ├── features/       # Feature modules (chat, group, dashboard...)
│       ├── core/           # Auth clients, data fetchers
│       └── shared/         # Reusable UI components
├── core-backend/           # FastAPI — users, messages, groups
├── realtime-service/       # FastAPI + Socket.IO — presence, typing
├── call-service/           # Node.js + Express — WebRTC signaling
├── ai-backend/             # FastAPI — AI assistant
├── supabase/
│   └── migrations/         # Database schema
└── docker-compose.yml
```

## License

MIT
