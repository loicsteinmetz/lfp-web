export const mapAuthor = (d: any): Author => ({
  id: d.id,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
})
