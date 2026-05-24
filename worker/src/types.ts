export type MediaOption = { formatId: string; label: string; container: string; bitrate?: number };
export type MediaMetadata = { source: string; title: string; duration: number; thumbnail: string; options: MediaOption[] };

export interface ExtractorAdapter {
  canHandle(url: URL): boolean;
  resolve(url: string): Promise<MediaMetadata>;
  stream(url: string, formatId: string): Promise<Response>;
}
