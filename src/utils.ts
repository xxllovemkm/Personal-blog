export function postSlug(id: string): string {
  return id.replace(/\.(mdx?|md)$/, '');
}

export function sitePath(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!base) return normalizedPath;
  if (normalizedPath === '/') return `${base}/`;

  return `${base}${normalizedPath}`;
}

export function postPath(id: string): string {
  return sitePath(`/posts/${postSlug(id)}`);
}

export function tagPath(tag: string): string {
  return sitePath(`/tags/${encodeURIComponent(tag)}`);
}
