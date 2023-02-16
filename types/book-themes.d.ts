type BookTheme = {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,

  // Populated >>>
  books?: Book[],
}

type PopulatedBookThemeOption = '*';
