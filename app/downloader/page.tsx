import { DownloaderPanel } from '@/components/downloader-panel';

export default function DownloaderPage() {
  return (
    <main className="min-h-screen bg-grain px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <DownloaderPanel />
      </div>
    </main>
  );
}
