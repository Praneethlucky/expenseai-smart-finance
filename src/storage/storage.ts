export interface TokenStorage {
  getToken(): Promise<string | null>;
  getRefreshToken(): Promise<string | null>;

  setToken(token: string): Promise<void>;
  setRefreshToken(token: string): Promise<void>;

  clearTokens(): Promise<void>;
  deviceType: string;
}