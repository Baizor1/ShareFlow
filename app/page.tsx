import Link from 'next/link';
import { ArrowRight, Lock, Sparkles, Zap } from 'lucide-react';
import { UrlDropzone } from '@/components/url-dropzone';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-grain px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl space-y-16">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">ShareFlow</h1>
          <Link href="/privacy" className="text-sm text-zinc-300 hover:text-white">Privacy</Link>
        </header>

        <section className="glass rounded-3xl p-8 shadow-glow md:p-12">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-300">
            <Sparkles size={14} /> Edge-native. Zero accounts. Zero tracking.
          </p>
          <h2 className="text-4xl font-semibold leading-tight md:text-6xl">Paste link → Download instantly.</h2>
          <p className="mt-4 max-w-2xl text-zinc-300">Premium, privacy-first media downloading that runs entirely on Cloudflare. No login, no history, no permanent storage.</p>
          <div className="mt-8"><UrlDropzone /></div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Lock, title: 'Privacy by design', text: 'No accounts, no sessions, no permanent media storage.' },
            { icon: Zap, title: 'Edge streaming', text: 'Stateless Worker architecture optimized for global speed.' },
            { icon: ArrowRight, title: 'Adapter-based', text: 'Ready for yt-dlp / FFmpeg service integration later.' },
          ].map((f) => (
            <article key={f.title} className="glass rounded-2xl p-6">
              <f.icon className="mb-3 text-brand" />
              <h3 className="font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{f.text}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
