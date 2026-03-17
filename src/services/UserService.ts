import { apiFetch } from "./apiClient"
import { ApiResponse } from "../models/apiTypes"
import { User, UserRegisterRequest } from "../models/user";


export async function UserProfile()
{
    const response = await apiFetch<ApiResponse<User>>(
    "/user/profile",
    {
      method: "GET"
    }
    );
    return response.data;
}

export async function UserRegister(userRegisterRequest : UserRegisterRequest) {
    const response = await apiFetch<ApiResponse<string>>(
        "/user/register",
        {
          method: "POST",
          body: JSON.stringify(userRegisterRequest)
        }
      )
      return response;
}