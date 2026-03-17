export type DebtType = "GIVEN" | "TAKEN"

export interface Debt {
  debtId: number
  personName: string
  type: "GIVEN" | "TAKEN"
  totalAmount: number
  paid: number
  pending: number
  description?: string
}

export interface CreateDebtDto {
  personName: string
  type: DebtType
  amount: number
  description?: string
}

export interface DebtSummary {
  givenPending: number
  takenPending: number
  net: number
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

export interface AddDebtPaymentDto {
  debtId: number
  amount: number
  paymentDate: string
}