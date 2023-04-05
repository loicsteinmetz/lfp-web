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
  books_how_to: string,

  // Populated >>>
  banner?: LFPMedia,
  favicon?: LFPMedia,
  logo?: LFPMedia,
  logoLg?: LFPMedia,
  cover?: LFPMedia,
  mobile_logo?: LFPMedia,
}

type PopulatedGeneralOption = '*';
