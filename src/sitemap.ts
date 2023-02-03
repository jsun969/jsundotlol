import { SITE } from './constants';

export const basePages = ['/', '/blog', '/tags', '/about', '/friends'];

// TODO: Add blog posts pages to sitemap
// const blogPages = (await getCollection('blog')).map(
//   ({ slug }) => '/blog/' + slug,
// );

export const pages = basePages.map((url) => SITE + url);
