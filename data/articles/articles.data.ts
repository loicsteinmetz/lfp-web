export const mapArticle = (d: any): Article => ({
  id: d.id,
  title: d.attributes.title,
  slug: d.attributes.slug,
  extract: d.attributes.extract,
  body: d.attributes.body,
  createdAt: new Date(d.attributes.createdAt),
  updatedAt: new Date(d.attributes.updatedAt),
  publishedAt: new Date(d.attributes.publishedAt),
})
