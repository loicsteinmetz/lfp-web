type Category = {
  id: number,
  name: string,
  slug: string,
  createdAt: Date,
  updatedAt: Date,

  // Populated >>>
  articles?: Author[],
}

type PopulatedCategoryOption = '*';
