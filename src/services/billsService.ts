import { apiFetch } from "./apiClient"
import { ApiResponse } from "../models/apiTypes"
import { Bill, CreateBillRequestDto, UpdateBillDto } from "../models/BillType";

export async function CreateBill(newBill: CreateBillRequestDto)
{
    const response = await apiFetch<ApiResponse<string>>(
    "/bills",
        {
        method: "POST",
        body: JSON.stringify(newBill)
        }
    );
    return response;
}

export async function GetUserBills()
{
    const response = await apiFetch<ApiResponse<Bill[]>>(
    "/bills"
    );
    return response;
}

export async function DeleteBill(id: number)
{
    const response = await apiFetch<ApiResponse<Bill[]>>(
    "/bills",
        {
        method: "DELETE",
        body: JSON.stringify(id)
        }
    );
    return response;
}

export async function UpdateBill(bill: UpdateBillDto)
{
    const response = await apiFetch<ApiResponse<Bill[]>>(
    "/bills",
        {
        method: "PUT",
        body: JSON.stringify(bill)
        }
    );
    return response;
}