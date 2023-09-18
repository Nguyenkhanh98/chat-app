import axios from "axios";
import Config from "@/configs/config";
import { localStorageAPI } from "@/services/webapi/storage";
import { LOCAL_STORAGE } from "@/configs/storage";

let APIInstance: any;

function createAPIInstance() {
  if (!APIInstance) {
    APIInstance = axios.create({
      baseURL: Config.API.URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 8 * 1000,
    });

    APIInstance.interceptors.request.use(
      (config) => {
        const token = localStorageAPI.getItem(LOCAL_STORAGE.TOKEN);
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => {
        console.error("Request Interceptor Error:", error);
        return Promise.reject(error);
      }
    );
  }
  return APIInstance;
}

export const RequestAPI = createAPIInstance();
