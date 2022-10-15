type Category = {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,

  // Populated >>>
  articles?: Author[],
}

type PopulatedCategoryOption = '*';
