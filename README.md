# D-Lite v2

D-Lite v2 is a production-grade real-time chat application consisting of a frontend and 4 independent microservices.

## Architecture

- **frontend-service**: Next.js 15 web app (App Router, Tailwind, Shadcn)
- **core-backend**: FastAPI service handling Auth, Messages, Groups, Profiles
- **realtime-service**: Python Socket.IO service for ephemeral state (Typing, Presence, Reactions)
- **call-service**: Node.js + Express service for ZEGOCLOUD WebRTC integration
- **ai-backend**: FastAPI service for AI Assistant features (Claude, Deepgram, ElevenLabs)

## Getting Started

To run all services locally using Docker:

```bash
docker-compose up
```

Alternatively, you can run each service individually. Refer to the `README.md` inside each service directory.
