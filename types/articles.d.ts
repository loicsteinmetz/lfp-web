type Article = {
  id: number,
  title: string,
  slug: string,
  extract: string,
  body: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date,
}

type PopulatedArticleOption = '*';
