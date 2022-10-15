type Type = {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,

  // Populated >>>
  articles?: Author[],
}

type PopulatedTypeOption = '*';
