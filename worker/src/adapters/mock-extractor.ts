import { ExtractorAdapter, MediaMetadata } from '../types';

export class MockExtractorAdapter implements ExtractorAdapter {
  canHandle() { return true; }

  async resolve(url: string): Promise<MediaMetadata> {
    return {
      source: url,
      title: 'Sample media placeholder',
      duration: 245,
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&auto=format&fit=crop',
      options: [
        { formatId: 'mp4-1080', label: '1080p Video', container: 'mp4' },
        { formatId: 'mp4-720', label: '720p Video', container: 'mp4' },
        { formatId: 'mp3-320', label: 'High Quality Audio', container: 'mp3', bitrate: 320 },
      ],
    };
  }

  async stream(_url: string, formatId: string): Promise<Response> {
    const content = `ShareFlow placeholder stream for format ${formatId}.\nIntegrate yt-dlp + FFmpeg microservice for production.`;
    return new Response(content, {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'content-disposition': `attachment; filename="shareflow-${formatId}.txt"`,
        'cache-control': 'no-store',
      },
    });
  }
}
