import { Capacitor } from "@capacitor/core";
import { webStorage } from "./webStorage";
import { mobileSecureStorage } from "./mobileStorage";

export const storage = Capacitor.isNativePlatform()
  ? mobileSecureStorage
  : webStorage;