type Book = {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,
  slug: string;
  editor?: string;
  abstract?: string;
  year?: number


  // Populated >>>
  cover?: LFPMedia,
  owner?: Owner;
  loans?: Loan[]
  authors?: BookAuthor[],
  themes?: BookTheme[],
}

type PopulatedBookOption = '*';
