type Article = {
  id: number,
  title: string,
  slug: string,
  extract: string,
  body: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date,

  // Populated >>>
  cover?: LFPMedia | null,
  authors?: Author[],
  types?: Type[],
  categories?: Category[],
}

type PopulatedArticleOption = '*';
