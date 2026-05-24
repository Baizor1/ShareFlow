import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ShareFlow — Privacy-first universal media downloader',
  description: 'Paste a media URL and download instantly with edge streaming and zero tracking.',
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
