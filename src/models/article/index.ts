export interface GetSearchArticlesResponse {
  status: string;
  copyright: string;
  response: ApiResponse;
}

export interface ApiResponse {
  docs: Article[];
  meta: Meta;
}

export interface Article {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: Multimedia[];
  headline: Headline;
  keywords: Keyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: Byline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
  subsection_name?: string;
}

export interface Multimedia {
  rank: number;
  subtype: string;
  caption: null | string;
  credit: null | string;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy?: Legacy;
  subType: string;
  crop_name: string;
}

export interface Legacy {
  xlarge?: string;
  xlargewidth?: number;
  xlargeheight?: number;
  thumbnail?: string;
  thumbnailwidth?: number;
  thumbnailheight?: number;
  widewidth?: number;
  wideheight?: number;
  wide?: string;
}

export interface Headline {
  main: string;
  kicker?: null | string;
  content_kicker?: null | string;
  print_headline?: null | string;
  name: null | string;
  seo: null | string;
  sub: null | string;
}

export interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface Byline {
  original?: null | string;
  person: Person[];
  organization: null | string;
}

export interface Person {
  firstname: string;
  middlename?: null | string;
  lastname: string;
  qualifier: null | string;
  title: null | string;
  role: string;
  organization: string;
  rank: number;
}

export interface Meta {
  hits: number;
  offset: number;
  time: number;
}
