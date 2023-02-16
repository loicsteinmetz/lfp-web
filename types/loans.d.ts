type Loan = {
  id: number,
  name: string,
  loan_date?: Date,
  estimated_return_date?: Date,
  contact_name: string,
  contact_tel: string,
  status: 'demand' | 'ongoing' | 'completed',
  createdAt: Date,
  updatedAt: Date,

  // Populated >>>
  book?: Book,
  owner?: Owner,
}

type PopulatedLoanOption = '*';
