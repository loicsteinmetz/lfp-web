type Book = {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date,
  slug: string;
  priority: 'A' | 'B' | 'C',
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
