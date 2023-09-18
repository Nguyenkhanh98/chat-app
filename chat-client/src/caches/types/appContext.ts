import { TUserAPI } from "@/operations/types/user";

export type TAppContext = {
  backdrop: boolean;
  profile: TUserAPI;
  currentChatUser: TUserAPI;
  contactSearch: any;
  contactsPage: any;
  onlineUsers: any;
  notifications: any[];
};
