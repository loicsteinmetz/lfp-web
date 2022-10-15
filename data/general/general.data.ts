import {mapLFPMedia} from '../_lfp/_lfp.data';

export const mapGeneral = (d: any): General => ({
  id: d.id,
  facebook: d.attributes.facebook,
  youtube: d.attributes.youtube,
  email: d.attributes.email,
  createdAt: d.attributes.createdAt,
  updatedAt: d.attributes.updatedAt,
  publishedAt: d.attributes.publishedAt,
  banner: d.attributes.banner ? mapLFPMedia(d.attributes.banner) : undefined,
  logo: d.attributes.logo ? mapLFPMedia(d.attributes.logo) : undefined,
  favicon: d.attributes.favicon ? mapLFPMedia(d.attributes.favicon) : undefined,
})
