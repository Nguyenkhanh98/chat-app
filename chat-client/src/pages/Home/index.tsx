import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import Chat from "@/components/Chat";
import ChatList from "@/components/ChatList";
import Empty from "@/components/Empty";
import { useWriteCacheSocket } from "@/caches/writes/socket";
import { useReadCachAppContext } from "@/caches/reads/appContext";
import {
  useGetMessageQuery,
  useQueryGetMessageFromUser,
} from "@/operations/queries/message";
import { Config } from "@/configs";
import { useWriteCacheAppContext } from "@/caches/writes/appContext";
import {
  useWriteCacheAddMessage,
  useWriteCacheSetMessageRead,
} from "@/caches/writes/message";

export default function Main() {
  const socket = useRef();
  const [socketEvent, setSocketEvent] = useState(false);
  const updateSocket = useWriteCacheSocket();
  const updateAppContext = useWriteCacheAppContext();
  const addMesage = useWriteCacheAddMessage();
  const markeMessageRead = useWriteCacheSetMessageRead();
  const appContext = useReadCachAppContext();
  const { currentChatUser, profile: userInfo } = appContext;

  const { data: messages, refetch } = useGetMessageQuery(
    {
      from: userInfo.id,
      to: currentChatUser?.id,
    },
    { enabled: false }
  );

  useEffect(() => {
    if (userInfo) {
      socket.current = io(Config.default.API.URL);
      socket.current.emit("add-user", userInfo.id);
      updateSocket(socket);
    }
  }, [userInfo]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-recieve", (data: any) => {
        addMesage({
          newMessage: { ...data.message },
        });
      });

      socket.current.on("online-users", ({ onlineUsers }) => {
        updateAppContext({
          onlineUsers,
        });
      });

      socket.current.on("mark-read-recieve", ({ id, recieverId }) => {
        console.log("mark-read-recieve mark-read-recieve", recieverId, id);
        markeMessageRead({ recieverId, id });
      });

      socket.current.on("noti-recieve", ({ notifications }) => {
        console.log(
          "noti-recievenoti-recievenoti-recievenoti-recieve",
          notifications
        );
        updateAppContext({ notifications: notifications });
      });
      setSocketEvent(true);
    }
  }, [socket.current]);
  useEffect(() => {
    if (currentChatUser) {
      refetch({
        from: userInfo.id,
        to: currentChatUser?.id,
      });
    }
  }, [currentChatUser, userInfo]);

  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        {currentChatUser ? (
          <div className="grid-cols-2">
            <Chat />
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
}
