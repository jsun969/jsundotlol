import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

import { DESCRIPTION, SITE_NAME } from '../constants';

const parser = new MarkdownIt();

export const get = async (context: { site: string }) => {
  const blog = await getCollection('blog');
  return rss({
    title: SITE_NAME,
    description: DESCRIPTION,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
    })),
  });
};
