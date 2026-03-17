import { apiFetch } from "./apiClient"
import {
  Debt,
  CreateDebtDto,
  DebtSummary,
  ApiResponse,
  AddDebtPaymentDto
} from "../models/DebtType"

const base = "/debts"

export const DebtService = {
  async list(): Promise<Debt[]> {
    const res = await apiFetch<ApiResponse<Debt[]>>(`${base}`)
    return res.data
  },

  async summary(): Promise<DebtSummary> {
    const res = await apiFetch<ApiResponse<DebtSummary>>(
      `${base}/summary`
    )
    return res.data
  },

  async create(dto: CreateDebtDto) {
    await apiFetch(`${base}`, {
      method: "POST",
      body: JSON.stringify(dto),
    })
  },

  async payment(dto: AddDebtPaymentDto) {
  await apiFetch(`${base}/payment`, {
    method: "POST",
    body: JSON.stringify(dto),
  })
}
}