'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export function UrlDropzone() {
  const [url, setUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
    <div
      className={`rounded-2xl border p-4 transition ${dragActive ? 'border-brand' : 'border-white/15'}`}
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        const dropped = e.dataTransfer.getData('text');
        if (dropped) setUrl(dropped);
      }}
    >
      <input ref={ref} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste media URL" className="w-full rounded-xl border border-white/10 bg-black/30 p-3 outline-none" />
      <div className="mt-3 flex gap-2">
        <Button onClick={async () => {
          const clip = await navigator.clipboard.readText().catch(() => '');
          if (clip) setUrl(clip);
          ref.current?.focus();
        }}>Paste from Clipboard</Button>
        <Button className="bg-white text-black" onClick={() => router.push(`/downloader?url=${encodeURIComponent(url)}`)}>Continue</Button>
      </div>
    </div>
  );
}
