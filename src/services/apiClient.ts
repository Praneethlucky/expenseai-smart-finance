import { ApiError } from "../models/apiTypes"
import { storage } from "@/storage";

const API_BASE = "https://expensetrack.runasp.net/api"

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  async function doFetch(token?: string) {

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    })

    const data = await response.json().catch(() => null)

    return { response, data }
  }


  let token = await storage.getToken()

  // first call
  let { response, data } = await doFetch(token)


  if (response.status === 401) {

    const refreshToken = await storage.getRefreshToken()

    if (!refreshToken) {
      await storage.clearTokens()
      throw { message: "Session expired" }
    }

    // call refresh
    const refreshResponse = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken })
    })

    const refreshData = await refreshResponse.json()

    if (!refreshResponse.ok) {
      await storage.clearTokens()
      throw { message: "Session expired" }
    }

    // save new token
    await storage.setToken(refreshData.accessToken)

    token = refreshData.accessToken

    // ✅ retry original call
    const retry = await doFetch(token)

    response = retry.response
    data = retry.data
  }


  if (!data?.success) {
    const error: ApiError = {
      status: response.status,
      message: data?.message || "Request failed",
      errorCode: data?.errorCode
    }
    throw error
  }

  return data as T
}