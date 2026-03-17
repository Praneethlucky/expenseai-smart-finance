import { apiFetch } from "./apiClient"
import { ApiResponse } from "../models/apiTypes"
import { Category, CreateCategoryDto } from "../models/category";


export async function GetCategories()
{
    const response = await apiFetch<ApiResponse<Category[]>>(
    "/categories/list",
    {
      method: "GET"
    }
    );
    return response.data;
}

export async function CreateCategory(category: CreateCategoryDto)
{
    const response = await apiFetch<ApiResponse<number>>(
    "/categories/create",
    {
      method: "POST",
      body: JSON.stringify(category)
    }
    );
    return response.data;
}

export async function UpdateCategory(category: Category)
{
    const response = await apiFetch<ApiResponse<Category[]>>(
    "/categories/update",
        {
        method: "PUT",
        body: JSON.stringify(category)
        }
    );
    return response.data;
}

export async function DeleteCategory(id: Number)
{
    console.log(id)
    const response = await apiFetch<ApiResponse<number>>(
    "/categories/delete",
    {
      method: "DELETE",
      body: JSON.stringify(id)
    }
    );
    return response.data;
}