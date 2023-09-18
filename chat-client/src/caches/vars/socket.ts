import { TSocket } from "../types";
import { CACHE_PREFIX } from "@/configs/prefix";

export const VAR_CACHE_SOCKET_SETTING = CACHE_PREFIX + "socket";

export const socketInitCache: TSocket = {
  current: null,
};
