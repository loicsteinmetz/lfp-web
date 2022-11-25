type General = {
  id: number,
  facebook: string,
  youtube: string,
  email: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date,
  maintenance: boolean,

  // Populated >>>
  banner?: LFPMedia,
  favicon?: LFPMedia,
  logo?: LFPMedia,
  logoLg?: LFPMedia,
}

type PopulatedGeneralOption = '*';
