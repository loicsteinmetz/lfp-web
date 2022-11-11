export const mapMetadata = (d: any): Metadata => ({
  page: d.pagination.page,
  pageSize: d.pagination.pageSize,
  pageCount: d.pagination.pageCount,
  total: d.pagination.total,
})

export const mapLFPMedia = (d: any): LFPMedia => ({
  id: d.data.id,
  name: d.data.attributes.name,
  alternativeText: d.data.attributes.alternativeText,
  caption: d.data.attributes.caption,
  width: d.data.attributes.width,
  height: d.data.attributes.height,
  hash: d.data.attributes.hash,
  ext: d.data.attributes.ext,
  mime: d.data.attributes.mime,
  size: d.data.attributes.size,
  url: d.data.attributes.url,
  createdAt: new Date(d.data.attributes.createdAt),
  updatedAt: new Date(d.data.attributes.updatedAt),
  formats: mapLFPMediaFormats(d.data.attributes.formats),
})

const mapLFPMediaFormats = (d: any): LFPMediaFormats => ({
  large: d.large ? mapLFPMediaFormat(d.large) : undefined,
  small: d.small ? mapLFPMediaFormat(d.small) : undefined,
  medium: d.medium ? mapLFPMediaFormat(d.medium) : undefined,
  thumbnail: d.thumbnail ? mapLFPMediaFormat(d.thumbnail) : undefined,
})

const mapLFPMediaFormat = (d: any): LFPMediaFormat => ({
  ext: d.ext,
  url: d.url,
  hash: d.hash,
  mime: d.mime,
  name: d.name,
  size: d.size,
  width: d.width,
  height: d.height,
})

export const mapExternalMedia = (d: any): ExternalMedia => ({
  source: d.source,
  url: d.url,
})
