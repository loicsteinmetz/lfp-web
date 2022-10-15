export const mapLFPMedia = (d: any): LFPMedia => ({
  id: d.id,
  name: d.attributes.name,
  alternativeText: d.attributes.alternativeText,
  caption: d.attributes.caption,
  width: d.attributes.width,
  height: d.attributes.height,
  hash: d.attributes.hash,
  ext: d.attributes.ext,
  mime: d.attributes.mime,
  size: d.attributes.size,
  url: d.attributes.url,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  formats: mapLFPMediaFormats(d.attributes.formats),
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
