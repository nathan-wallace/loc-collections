export interface FacetFilter {
  term: string;
  title: string;
  count: number;
  on?: string | null;
  off?: string | null;
  not?: string | null;
}
export interface Facet {
  filters: FacetFilter[];
  [k: string]: unknown;
}
export interface Pagination {
  from: number; to: number; results: string; last: string | null; total: number;
  previous: string | null; perpage: number; of: number; next: string | null;
  current: number; page_list?: { url: string | null; number: number | string }[];
  first: string | null;
}
export interface ResultItem {
  id: string;
  title?: string;
  date?: string;
  image_url?: string[];
  format?: string[];
  online_format?: string[];
  subject?: string[];
  contributor?: string[];
  partof?: string[];
  [k: string]: unknown;
}
export interface SearchResponse {
  results?: ResultItem[];
  pagination?: Pagination;
  facets?: Facet[];
  [k: string]: unknown;
}
export interface ItemResourceFile {
  url?: string;
  width?: number; height?: number; mimetype?: string;
  info?: string;
  [k: string]: unknown;
}
export interface ItemResource {
  files?: ItemResourceFile[][] | ItemResourceFile[];
  image?: string;
  info?: string;
  url?: string;
  type?: string;
  width?: number; height?: number;
  [k: string]: unknown;
}
export interface ItemObject {
  id: string; title?: string; description?: string[];
  contributors?: Record<string, string>[] | string[];
  subjects?: string[]; subject?: string[]; dates?: string[]; date?: string;
  image_url?: string[];
  url?: string;
  format?: string[]; online_format?: string[];
  [k: string]: unknown;
}
export interface ItemResponse {
  item?: ItemObject;
  resources?: ItemResource[];
  image_url?: string[];
  id?: string;
  [k: string]: unknown;
}
export type ItemSummary = {
  id: string;
  title: string;
  thumb?: string | null;
  date?: string | null;
  /** Slug is present when the summary represents a collection */
  slug?: string;
};

export type CollectionSummary = ItemSummary & { slug: string };
