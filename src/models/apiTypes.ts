export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  errorCode?: string
}

export interface ApiError {
  status: number
  message: string
  errorCode?: string
}