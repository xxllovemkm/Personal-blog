export function postSlug(id: string): string {
  return id.replace(/\.(mdx?|md)$/, '');
}
