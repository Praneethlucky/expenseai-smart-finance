import { apiFetch } from "./apiClient"
import { ApiResponse } from "../models/apiTypes"
import { PaymentType } from "../models/paymentType"
import { storage } from "../storage"


export async function GetPaymentTypes() {

  const response = await apiFetch<ApiResponse<PaymentType[]>>(
    "/paymenttypes",
    {
      method: "GET",
    }
  )
  return response.data;
}