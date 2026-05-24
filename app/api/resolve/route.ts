import { NextRequest, NextResponse } from 'next/server';
import { urlSchema } from '@/lib/validation';

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL ?? 'http://127.0.0.1:8787';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = urlSchema.safeParse(body.url);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid URL' }, { status: 400 });
  }

  const res = await fetch(`${WORKER_URL}/resolve`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ url: parsed.data }),
  });

  const json = await res.json();
  return NextResponse.json(json, { status: res.status });
}
