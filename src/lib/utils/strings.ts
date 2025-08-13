export function slugToTitle(slug: string): string {
  return slug
    .replace(/[\-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
