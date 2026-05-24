'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type MediaOption = { formatId: string; label: string; container: string; bitrate?: number };
type ResolveResponse = { title: string; duration: number; thumbnail: string; options: MediaOption[]; source: string };

export function DownloaderPanel() {
  const params = useSearchParams();
  const [url, setUrl] = useState(params.get('url') ?? '');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ResolveResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { setUrl(params.get('url') ?? ''); }, [params]);

  async function resolveMedia() {
    setLoading(true); setError(null);
    const res = await fetch('/api/resolve', { method: 'POST', body: JSON.stringify({ url }) });
    const json = await res.json();
    if (!res.ok) { setError(json.error ?? 'Could not resolve media.'); setLoading(false); return; }
    setData(json); setLoading(false);
  }

  return (
    <section className="glass rounded-3xl p-6 md:p-8">
      <h1 className="text-2xl font-semibold">Downloader</h1>
      <div className="mt-4 flex gap-2">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="w-full rounded-xl border border-white/10 bg-black/30 p-3" />
        <Button onClick={resolveMedia} disabled={loading}>{loading ? 'Loading...' : 'Fetch'}</Button>
      </div>
      {loading && <div className="mt-6 h-24 animate-pulse rounded-xl bg-white/5" />}
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      {data && (
        <div className="mt-6 space-y-4">
          <img src={data.thumbnail} alt="thumbnail" className="h-44 w-full rounded-xl object-cover" />
          <h2 className="text-lg font-medium">{data.title}</h2>
          <p className="text-sm text-zinc-300">Duration: {Math.round(data.duration)}s</p>
          <div className="grid gap-2">
            {data.options.map((opt) => (
              <a key={opt.formatId} href={`/api/download?url=${encodeURIComponent(data.source)}&format=${opt.formatId}`} className="rounded-xl border border-white/10 p-3 hover:bg-white/5">
                {opt.label} · {opt.container}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
