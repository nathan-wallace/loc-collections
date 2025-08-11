export function toIIIFLargest(url: string): string {
  if (!/\/iiif\//.test(url)) return url;
  const u = new URL(url, 'https://');
  const path = u.pathname;
  const v3 = path.replace(/\/full\/[^/]+\/0\/(?:default|color|gray|bitonal)\.(jpg|png|webp)/,
    '/full/max/0/default.$1');
  if (v3 !== path) { u.pathname = v3; return u.toString(); }
  const v2 = path.replace(/\/full\/[^/]+\/0\/(?:default|native|color|gray)\.(jpg|png|webp)/,
    '/full/full/0/default.$1');
  if (v2 !== path) { u.pathname = v2; return u.toString(); }
  return u.toString();
}
export function looksLikeIIIF(url: string): boolean {
  return /\/iiif\//.test(url) || /iiif\.io\//.test(url);
}
