type LFPMedia = {
  id: number,
  name: string,
  alternativeText: string,
  caption: string,
  width: number,
  height: number,
  formats: LFPMediaFormats,
  hash: string,
  ext: string,
  mime: string,
  size: number,
  url: string,
  createdAt: Date,
  updatedAt: Date,
}

type LFPMediaFormats = {
  large?: LFPMediaFormat,
  small?: LFPMediaFormat,
  medium?: LFPMediaFormat,
  thumbnail?: LFPMediaFormat,
}

type LFPMediaFormat = {
  ext: string,
  url: string,
  hash: string,
  mime: string,
  name: string,
  size: number,
  width: number,
  height: number,
}

type Metadata = {
  page: number,
  pageSize: number,
  pageCount: number,
  total: number,
}

type WithMetadata<T> = {
  meta: Metadata,
  data: T,
}

type ExternalMedia = {
  source: 'youtube';
  url: string;
}
