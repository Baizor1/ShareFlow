import { getExtractor } from './services/extractor-registry';

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/resolve') {
      const body = (await request.json().catch(() => ({}))) as { url?: string };
      if (!body.url) return json({ error: 'Missing URL' }, 400);
      const extractor = getExtractor(body.url);
      const metadata = await extractor.resolve(body.url);
      return json(metadata);
    }

    if (request.method === 'GET' && url.pathname === '/download') {
      const source = url.searchParams.get('url');
      const format = url.searchParams.get('format');
      if (!source || !format) return json({ error: 'Missing query params' }, 400);
      const extractor = getExtractor(source);
      return extractor.stream(source, format);
    }

    return json({ status: 'ok', service: 'shareflow-edge-worker' });
  },
};
