# Autobuild — möte → prototyp (drag 3)

Loopen: MeetGeek-möte → webhook → GitHub Action hämtar transkript → Canon-analys + `/new-build` → preview-deploy → PR med /lab-kort. **Preview + mänsklig grind** — inget pushas oövervakat till live.

```
MeetGeek (möte klart)
   │  signerad webhook (HMAC SHA-256)
   ▼
/api/meetgeek-webhook   (verifierar, svarar 200 snabbt)
   │  repository_dispatch
   ▼
.github/workflows/autobuild.yml
   │  transkript → Canon-analys → /new-build → vercel preview
   ▼
PR på surprisesystems med concept-kort  ←  du granskar + merge:ar → live på /lab
```

## Status
- ✅ Webhook-mottagare (`src/app/api/meetgeek-webhook/route.ts`) — HMAC-verifiering testad lokalt
- ✅ GitHub Action (`.github/workflows/autobuild.yml`) — full pipeline, manuell test via `workflow_dispatch`
- ⏳ Inte aktiverad — kräver secrets + MeetGeek-webhook nedan

## Aktivering

### 1. GitHub repo secrets (Settings → Secrets and variables → Actions)
| Secret | Vad |
|---|---|
| `MEETGEEK_API_KEY` | Hämtar transkript (server-to-server) |
| `ANTHROPIC_API_KEY` | Claude headless (analys + /new-build) i CI |
| `VERCEL_TOKEN` | Preview-deploy |
| `GH_PAT` | Skapa PR (repo-scope personal access token) |

### 2. Vercel env (för webhook-routen)
| Env | Vad |
|---|---|
| `MEETGEEK_WEBHOOK_SECRET` | Delad HMAC-secret (samma som i MeetGeek) |
| `GITHUB_DISPATCH_TOKEN` | GitHub PAT (repo-scope) som triggar Action |
| `GITHUB_DISPATCH_REPO` | `davidboorg/surprisesystems` (default om utelämnad) |

### 3. MeetGeek-webhook
MeetGeek → Settings → Integrations → Public API → sätt Webhook URL till:
`https://surprisesystems.io/api/meetgeek-webhook` och samma secret som `MEETGEEK_WEBHOOK_SECRET`.

## Testa utan möte (manuellt)
GitHub → Actions → "Autobuild" → Run workflow → klistra in en **brief** i fältet (hoppar över MeetGeek-hämtning). Kräver `ANTHROPIC_API_KEY` + `VERCEL_TOKEN` + `GH_PAT`. Resultat: ny preview + PR med /lab-kort.

## Att verifiera mot MeetGeeks dok (kan ha ändrats)
- Exakt **signatur-header-namn** (koden provar `x-meetgeek-signature`, `x-signature`, `x-hub-signature-256`)
- Exakt **transkript-endpoint** (`/v1/meetings/{id}/transcript` antaget)
- Exakt **payload-fält** för meeting_id (koden täcker `meeting_id`, `meetingId`, `meeting.id`)

## Säkerhet
Alla nycklar i secrets/env — aldrig i kod. Webhook verifierar HMAC innan något händer. Bygget landar som PR, aldrig direkt på live.
