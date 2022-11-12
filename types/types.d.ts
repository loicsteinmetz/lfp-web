type Type = {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,
  slug: string,

  // Populated >>>
  articles?: Author[],
}

type PopulatedTypeOption = '*';
