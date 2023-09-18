import { useQueryClient } from "@tanstack/react-query";
import {
  VAR_MESSAGE_API,
  VAR_MESSAGE_FROM_USER,
} from "@/operations/vars/message";
import { TAppContext, TSocket } from "../types";
import {
  VAR_CACHE_APP_CONTEXT_SETTING,
  VAR_CACHE_SOCKET_SETTING,
} from "../vars";

interface IAddMessage {
  newMessage: {
    senderId: string;
    recieverId: string;
    type: any;
    message: any;
    messageStatus: any;
    sender: {
      id: string;
      name: string;
      profilePicture: string;
    };
    reciever: {
      id: string;
      name: string;
      profilePicture: string;
    };
    id: any;
    createdAt: any;
  };
  fromSelf?: any;
}
export const useWriteCacheAddMessage = () => {
  const queryClient = useQueryClient();

  return (data: IAddMessage) => {
    const socket: TSocket | any = queryClient.getQueryData([
      VAR_CACHE_SOCKET_SETTING,
    ]);

    const appContext: TAppContext | any = queryClient.getQueryData([
      VAR_CACHE_APP_CONTEXT_SETTING,
    ]);

    const userContacts: any =
      queryClient.getQueryData([VAR_MESSAGE_FROM_USER]) || {};

    queryClient.setQueryData([VAR_MESSAGE_API], (preState: any) => {
      if (
        appContext.currentChatUser?.id === data.newMessage.senderId ||
        data?.fromSelf
      ) {
        socket.current.emit("mark-read", {
          id: data.newMessage.senderId,
          recieverId: data.newMessage.recieverId,
        });

        const clonedContacts = [...userContacts.users];
        if (data.newMessage.recieverId === appContext.profile.id) {
          const index = clonedContacts.findIndex(
            (contact) => contact.id === data.newMessage.senderId
          );
          if (index !== -1) {
            const dataCloned = clonedContacts[index];
            dataCloned.message = data.newMessage.message;
            dataCloned.type = data.newMessage.type;
            dataCloned.messageId = data.newMessage.id;
            dataCloned.messageStatus = data.newMessage.messageStatus;
            dataCloned.recieverId = data.newMessage.recieverId;
            dataCloned.senderId = data.newMessage.senderId;
            clonedContacts.splice(index, 1);
            clonedContacts.unshift(dataCloned);
          }

          queryClient.setQueryData([VAR_MESSAGE_FROM_USER], (preState: any) => {
            return { ...preState, users: clonedContacts };
          });
          return [...preState, data.newMessage];
        } else {
          const index = clonedContacts.findIndex(
            (contact) => contact.id === data.newMessage.recieverId
          );
          if (index !== -1) {
            const dataCloned = clonedContacts[index];
            dataCloned.message = data.newMessage.message;
            dataCloned.type = data.newMessage.type;
            dataCloned.messageId = data.newMessage.id;
            dataCloned.messageStatus = data.newMessage.messageStatus;
            dataCloned.recieverId = data.newMessage.recieverId;
            dataCloned.senderId = data.newMessage.senderId;
            clonedContacts.splice(index, 1);
            clonedContacts.unshift(dataCloned);
          } else {
            const {
              message,
              type,
              id,
              messageStatus,
              recieverId,
              senderId,
              createdAt,
            } = data.newMessage;
            const dataShift = {
              message,
              type,
              messageId: id,
              messageStatus,
              recieverId,
              senderId,
              createdAt,
              id: data.newMessage.reciever.id,
              name: data.newMessage.reciever.name,
              profilePicture: data.newMessage.reciever.profilePicture,
              totalUnreadMessages: data.fromSelf ? 0 : 1,
            };
            clonedContacts.unshift(dataShift);
          }
          queryClient.setQueryData([VAR_MESSAGE_FROM_USER], (preState: any) => {
            return { ...preState, users: clonedContacts };
          });
          return [...preState, data.newMessage];
        }
      } else {
        const clonedContacts = [...userContacts.users];
        const index = clonedContacts.findIndex(
          (contact) => contact.id === data.newMessage.senderId
        );
        if (index !== -1) {
          const dataCloned = clonedContacts[index];
          dataCloned.message = data.newMessage.message;
          dataCloned.type = data.newMessage.type;
          dataCloned.messageId = data.newMessage.id;
          dataCloned.messageStatus = data.newMessage.messageStatus;
          dataCloned.recieverId = data.newMessage.recieverId;
          dataCloned.senderId = data.newMessage.senderId;
          dataCloned.totalUnreadMessages += 1;
          clonedContacts.splice(index, 1);
          clonedContacts.unshift(dataCloned);
        } else {
          const {
            message,
            type,
            id,
            messageStatus,
            recieverId,
            senderId,
            createdAt,
          } = data.newMessage;
          const dataShift = {
            message,
            type,
            messageId: id,
            messageStatus,
            recieverId,
            senderId,
            createdAt,
            id: data.newMessage.sender.id,
            name: data.newMessage.sender.name,
            profilePicture: data.newMessage.sender.profilePicture,
            totalUnreadMessages: data.fromSelf ? 0 : 1,
          };
          clonedContacts.unshift(dataShift);
        }
        queryClient.setQueryData([VAR_MESSAGE_FROM_USER], (preState: any) => {
          return { ...preState, users: clonedContacts };
        });
      }
    });
    queryClient.invalidateQueries([VAR_MESSAGE_FROM_USER]);
  };
};

export const useWriteCacheSetMessageRead = () => {
  const queryClient = useQueryClient();

  const appContext: TAppContext | any = queryClient.getQueryData([
    VAR_CACHE_APP_CONTEXT_SETTING,
  ]);

  const { profile: userInfo } = appContext;

  return (data: any) => {
    queryClient.setQueryData([VAR_MESSAGE_API], (preState: any) => {
      if (userInfo.id === data.id) {
        const clonedMessages = [...preState];
        const userContacts: any =
          queryClient.getQueryData([VAR_MESSAGE_FROM_USER]) || [];
        const clonedContacts = [...userContacts.users];
        clonedMessages.forEach(
          (msg, index) => (clonedMessages[index].messageStatus = "read")
        );
        const index = clonedContacts.findIndex(
          (contact) => contact.id === data.recieverId
        );
        if (index !== -1) {
          clonedContacts[index].messageStatus = "read";
        }
        queryClient.setQueryData([VAR_MESSAGE_FROM_USER], (preState: any) => {
          return { ...preState, users: clonedContacts };
        });

        return clonedMessages;
      } else {
        return preState;
      }
    });

    queryClient.invalidateQueries([VAR_MESSAGE_FROM_USER]);
  };
};
