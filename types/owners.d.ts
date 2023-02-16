type Owner = {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,
  slug: string;
  name: string;
  tel: string;


  // Populated >>>
  books?: Book[],
}

type PopulatedOwnerOption = '*';
