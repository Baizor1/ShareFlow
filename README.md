# ShareFlow

ShareFlow is a privacy-focused universal media downloader designed for Cloudflare-first deployment.

## Principles

- No accounts, auth, sessions, or tracking
- Stateless request handling
- No permanent media storage
- Direct edge streaming whenever possible

## Stack

- Next.js (App Router + TypeScript + Tailwind + Framer Motion)
- Cloudflare Workers for media resolve/download APIs
- Optional Cloudflare R2 for temporary edge cache (TTL-only)

## Project Structure

- `app/` - Next.js routes, pages, API bridge routes
- `components/` - Reusable UI components
- `lib/` - Shared utilities and validation
- `worker/` - Cloudflare Worker and modular extractor adapters

## Local Development

```bash
npm install
npm run worker:dev
npm run dev
```

Set environment variables:

```bash
cp .env.example .env.local
```

## Cloudflare Deployment

### Frontend (Pages)

1. Connect repository in Cloudflare Pages.
2. Build command: `npm run build`
3. Build output: `.next`
4. Add env variable: `NEXT_PUBLIC_WORKER_URL=https://<your-worker-domain>`

### Worker

```bash
npm run worker:deploy
```

Attach custom route if needed:

- `api.shareflow.yourdomain.com/*` -> Worker route

## Architecture Notes

- Worker currently uses `MockExtractorAdapter` placeholder.
- Add `YtDlpAdapter` and/or `FfmpegOrchestratorAdapter` for production integrations.
- Keep Workers lightweight: offload heavy media processing to external microservices.
- Stream results to user; avoid buffering large files in memory.

## Security & Privacy

- Validate all input URLs
- Return `cache-control: no-store` for sensitive responses
- Avoid logs containing user URLs in production
- Remove any temporary objects aggressively if R2 cache is enabled


## Dependency Install Troubleshooting

If `npm install` fails in restricted environments:

1. Ensure npm proxy variables use standard names: `HTTP_PROXY` and `HTTPS_PROXY`.
2. Ensure the proxy allows outbound access to `https://registry.npmjs.org`.
3. If your network blocks public npm, configure an internal mirror in `.npmrc`:

```bash
npm config set registry https://<your-internal-npm-registry>
```

4. Retry with verbose output for diagnostics:

```bash
npm install --verbose
```
