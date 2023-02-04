import glob from 'fast-glob';
import path from 'path';

import { SITE } from './constants';

export const basePages = ['/', '/blog', '/tags', '/about', '/friends'];

const blogPages = (await glob('./src/content/blog/*.md')).map(
  (filePath) => '/blog/' + path.parse(filePath).name,
);

export const pages = [...basePages, ...blogPages].map((url) => SITE + url);
