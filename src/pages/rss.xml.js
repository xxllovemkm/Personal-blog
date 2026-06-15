import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

function postSlug(id) {
  return id.replace(/\.(mdx?|md)$/, '');
}

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const site = new URL(import.meta.env.BASE_URL, context.site).toString();
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

  return rss({
    title: '许兴龙的博客',
    description: '个人博客',
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary || '',
      link: `${base}posts/${postSlug(post.id)}/`,
    })),
  });
}
