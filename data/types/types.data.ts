export const mapType = (d: any): Type => ({
  id: d.id,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
})
