type Author = {
  id: number,
  displayName: string,
  slug: string,
  facebook: string | null,
  twitter: string | null,
  instagram: string | null,
  bio: string | null,
  createdAt: Date,
  updatedAt: Date,

  // Populated >>>
  picture?: LFPMedia,
  articles?: Article[],
}

type PopulatedAuthorOption = '*';
