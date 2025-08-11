export function toIIIFLargest(url: string): string {
  if (!/\/iiif\//.test(url)) return url;
  // Some IIIF image URLs are protocol-relative (e.g. `//tile.loc.gov/...`).
  // `new URL()` requires an absolute URL, so normalise these by prefixing
  // a scheme before parsing. Using `https:` is fine as the Library of
  // Congress serves images over HTTPS. The previous implementation attempted
  // to supply a base of `"https://"`, which is an invalid base URL and
  // caused `new URL()` to throw `TypeError: Failed to construct 'URL': Invalid
  // base URL` when executed. By ensuring the string is absolute before
  // constructing the URL object, we avoid the runtime error.
  const normalized = url.startsWith('//') ? `https:${url}` : url;
  const u = new URL(normalized);
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
