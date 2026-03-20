export type Occurrence = {
  occurrenceId: number
  name: string
  amount: number
  dueDate: string
  isPaid: boolean
  categoryName: string
  categoryIcon?: string
  categoryColor?: string
}

export type OccurrenceSummary = {
  upcoming: Occurrence[]
  paid: Occurrence[]
  pending: Occurrence[]

  totalBills: number
  totalPaid: number
  totalSalary: number
  totalIncome: number
  remaining: number
}

