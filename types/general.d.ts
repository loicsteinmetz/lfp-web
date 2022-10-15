type General = {
  id: number,
  facebook: string,
  youtube: string,
  email: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date,

  // Populated >>>
  banner?: LFPMedia,
  favicon?: LFPMedia,
  logo?: LFPMedia,
}

type PopulatedGeneralOption = '*';
