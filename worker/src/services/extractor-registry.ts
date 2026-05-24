import { MockExtractorAdapter } from '../adapters/mock-extractor';
import { ExtractorAdapter } from '../types';

const adapters: ExtractorAdapter[] = [new MockExtractorAdapter()];

export function getExtractor(url: string): ExtractorAdapter {
  const target = new URL(url);
  return adapters.find((a) => a.canHandle(target)) ?? adapters[0];
}
