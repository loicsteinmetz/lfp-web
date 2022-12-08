type Article = {
  id: number,
  title: string,
  slug: string,
  extract: string,
  body: string,
  footer: string,
  info: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date,

  // Populated >>>
  cover?: LFPMedia | null,
  authors?: Author[],
  types?: Type[],
  categories?: Category[],
  externalMedia?: ExternalMedia[];
  keywords?: string[];
}

type PopulatedArticleOption = '*';
