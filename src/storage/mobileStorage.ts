import { SecureStoragePlugin } from "capacitor-secure-storage-plugin";
import { TokenStorage } from "./storage";

export const mobileSecureStorage: TokenStorage = {
    async getToken() {
        try {
            const result = await SecureStoragePlugin.get({ key: "token" });
            return result.value;
        } catch {
            return null;
        }
    },

    async getRefreshToken() {
        try {
            const result = await SecureStoragePlugin.get({ key: "refreshToken" });
            return result.value;
        } catch {
            return null;
        }
    },

    async setToken(token: string) {
        await SecureStoragePlugin.set({
            key: "token",
            value: token
        });
    },

    async setRefreshToken(token: string) {
        await SecureStoragePlugin.set({
            key: "refreshToken",
            value: token
        });
    },

    async clearTokens() {
        try {
            await SecureStoragePlugin.remove({ key: "token" });
            await SecureStoragePlugin.remove({ key: "refreshToken" });
        } catch { }
    },
    deviceType: "Mobile"
};