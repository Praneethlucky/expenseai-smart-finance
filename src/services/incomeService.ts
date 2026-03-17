import { CreateIncomeRequestDto } from "../models/CreateIncomeDto"
import { apiFetch } from "./apiClient"
import { ApiResponse } from "../models/apiTypes"


export async function CreateIncome(dto: CreateIncomeRequestDto)
{
    const response = await apiFetch<ApiResponse<string>>(
        "/categories/list",
        {
          method: "GET"
        }
        );
        return response;
}