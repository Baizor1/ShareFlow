import { z } from 'zod';

export const urlSchema = z.string().url().refine((url) => ['http:', 'https:'].includes(new URL(url).protocol), 'Only HTTP/HTTPS URLs are allowed.');
