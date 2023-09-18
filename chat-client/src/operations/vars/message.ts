import { IMessage } from "../types";
import { API_PREFIX } from "@/configs/prefix";

export const VAR_MESSAGE_API = API_PREFIX + "message";
export const VAR_MESSAGE_FROM_USER = API_PREFIX + "message_from_user";

export const messages: IMessage[] = [];
