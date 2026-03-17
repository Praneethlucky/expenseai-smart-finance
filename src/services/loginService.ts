import { apiFetch } from "./apiClient"
import { ApiResponse } from "../models/apiTypes"
import { LoginRequest, LoginResponse } from "../models/user"
import { storage } from "../storage"


export async function loginUser(payload: LoginRequest) {

  const response = await apiFetch<ApiResponse<LoginResponse>>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(payload)
    }
  )
  storage.setRefreshToken(response.data?.refreshToken);
  storage.setToken(response.data?.accessToken);
  return response;
}

export async function logoutUser(refreshToken: string) {
    const response = await apiFetch<ApiResponse<LoginResponse>>(
    "/auth/logout",
    {
        method: "POST",
        body: JSON.stringify({refreshToken:  refreshToken})    
    }
  )
  storage.clearTokens();
  return response;
}