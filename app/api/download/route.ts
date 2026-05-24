import { NextRequest, NextResponse } from 'next/server';
import { urlSchema } from '@/lib/validation';

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL ?? 'http://127.0.0.1:8787';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url') ?? '';
  const format = req.nextUrl.searchParams.get('format') ?? '';

  const parsed = urlSchema.safeParse(url);
  if (!parsed.success || !format) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const upstream = await fetch(`${WORKER_URL}/download?url=${encodeURIComponent(parsed.data)}&format=${encodeURIComponent(format)}`);
  if (!upstream.ok || !upstream.body) return NextResponse.json({ error: 'Unable to stream file.' }, { status: upstream.status });

  return new NextResponse(upstream.body, {
    headers: {
      'content-type': upstream.headers.get('content-type') ?? 'application/octet-stream',
      'content-disposition': upstream.headers.get('content-disposition') ?? 'attachment; filename="shareflow.bin"',
      'cache-control': 'no-store',
    },
  });
}
