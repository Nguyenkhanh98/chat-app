import { useQueryClient } from "@tanstack/react-query";
import {
  VAR_CACHE_APP_CONTEXT_SETTING,
  VAR_CACHE_SOCKET_SETTING,
} from "../vars";
import { TAppContext } from "../types";
import { VAR_MESSAGE_FROM_USER } from "@/operations/vars/message";

export const useWriteCacheAppContext = () => {
  const queryClient = useQueryClient();
  return (data: Partial<TAppContext>) => {
    queryClient.setQueryData(
      [VAR_CACHE_APP_CONTEXT_SETTING],
      (preState: any) => {
        return {
          ...preState,
          ...data,
        };
      }
    );
  };
};

export const useWriteCacheCurrentChatUser = () => {
  const queryClient = useQueryClient();

  return (data: any) => {
    const socket = queryClient.getQueryData([VAR_CACHE_SOCKET_SETTING]);

    const userContacts: any =
      queryClient.getQueryData([VAR_MESSAGE_FROM_USER]) || [];

    queryClient.setQueryData(
      [VAR_CACHE_APP_CONTEXT_SETTING],
      (preState: any) => {
        console.log("mark-read", data, preState);
        socket.current.emit("mark-read", {
          id: preState.profile.id,
          recieverId: data.id,
        });
        const clonedContacts = [...userContacts.users];
        const index = clonedContacts.findIndex(
          (contact) => contact.id === data.id
        );
        if (index > -1) {
          clonedContacts[index].totalUnreadMessages = 0;

          queryClient.setQueryData([VAR_MESSAGE_FROM_USER], (preState: any) => {
            return { ...preState, users: clonedContacts };
          });
        }

        return {
          ...preState,
          currentChatUser: data,
        };
      }
    );
    queryClient.invalidateQueries([VAR_MESSAGE_FROM_USER]);
  };
};
