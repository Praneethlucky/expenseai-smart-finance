export interface LoginRequest {
  email: string
  password: string
  deviceId: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface User {
  userId: number;
  fullName: string;
  email: string;
  avatar?: string;
  currency?: string;
  createdAt: string;
  currentSalary: number;
}

export interface UserRegisterRequest {
    email: string,
    password: string,
    fullName: string,
    currentSalary: number
}