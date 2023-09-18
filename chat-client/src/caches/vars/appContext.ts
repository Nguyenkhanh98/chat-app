import { TAppContext } from "../types";
import { CACHE_PREFIX } from "@/configs/prefix";

export const VAR_CACHE_APP_CONTEXT_SETTING = CACHE_PREFIX + "appcontext";

export const appContextInitCache: TAppContext = {
  backdrop: false,
  profile: null,
  currentChatUser: null,
  contactSearch: "",
  contactsPage: false,
  notifications: [],
};
