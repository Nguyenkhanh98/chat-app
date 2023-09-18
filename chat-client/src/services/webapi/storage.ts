import { isJSON } from "@/helpers/string";

export const localStorageAPI = {
  getItem: (key: string): any => {
    const item = window.localStorage.getItem(key);
    if (isJSON(item)) {
      return JSON.parse(item);
    }
    return item;
  },
  setItem: (key: string, data: any) => {
    let dateTemp = data;
    if (typeof dateTemp === "object") {
      dateTemp = JSON.stringify(dateTemp);
    }
    window.localStorage.setItem(key, dateTemp);
  },
  remove: (key: string) => {
    window.localStorage.removeItem(key);
  },
};
