import { emailRegex } from "./regex";

export const isValidEmail = (email: any) => {
  return emailRegex.test(email);
};

export function isJSON(str: string | null): boolean {
  try {
    if (!str) {
      return false;
    }
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}
