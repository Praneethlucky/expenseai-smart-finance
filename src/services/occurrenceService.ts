import { apiFetch } from "./apiClient"
import { ApiResponse } from "../models/apiTypes"
import { OccurrenceSummary } from "../models/occurrenceTypes";

export async function GetMonthlyOccurrences(
  year: number,
  month: number
) {
  return apiFetch<ApiResponse<OccurrenceSummary>>(
    `/occurrences/monthly?year=${year}&month=${month}`
  )
}

export async function PayOccurrence(
  occurrenceId: number
) {
  return apiFetch(
    `/occurrences/MarkPaid`,
    {
      method: "PUT",
      body: JSON.stringify(occurrenceId,
      ),
    }
  )
}