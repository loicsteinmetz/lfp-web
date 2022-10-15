export const mapPage = (d: any): Page => ({
  id: d.id,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
})
