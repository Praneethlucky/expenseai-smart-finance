import { TokenStorage } from "./storage";

export const webStorage: TokenStorage = {
    async getToken() {
        return localStorage.getItem("token");
    },

    async getRefreshToken() {
        return localStorage.getItem("refreshToken");
    },

    async setToken(token: string) {
        localStorage.setItem("token", token);
    },

    async setRefreshToken(token: string) {
        localStorage.setItem("refreshToken", token);
    },

    async clearTokens() {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    },
    deviceType: "Web"
};