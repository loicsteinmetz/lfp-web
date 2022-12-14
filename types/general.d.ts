type General = {
  id: number,
  facebook: string,
  youtube: string,
  email: string,
  instagram: string,
  twitter: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date,
  maintenance: boolean,
  description: string,

  // Populated >>>
  banner?: LFPMedia,
  favicon?: LFPMedia,
  logo?: LFPMedia,
  logoLg?: LFPMedia,
  cover?: LFPMedia,
}

type PopulatedGeneralOption = '*';
