import { useEffect, useState } from "react";
import ChatContainer from "@/components/Chat/ChatContainer";
import ChatHeader from "@/components/Chat/ChatHeader";
import MessageBar from "@/components/Chat/MessageBar";
import { useReadCacheSocket } from "@/caches/reads/socket";
import { useReadCachAppContext } from "@/caches/reads/appContext";
import { useGetMessageQuery } from "@/operations/queries/message";
import { useAddMessageMutation } from "@/operations/mutations/message";
import { useWriteCacheAddMessage } from "@/caches/writes/message";

export default function Chat() {
  const [message, setMessage] = useState("");

  const socket = useReadCacheSocket();
  const appContext = useReadCachAppContext();
  const { currentChatUser, profile: userInfo, onlineUsers } = appContext;
  const { mutate } = useAddMessageMutation();
  const updateMessageCache = useWriteCacheAddMessage();
  const { refetch, data: messages } = useGetMessageQuery({
    from: userInfo?.id || "",
    to: currentChatUser?.id || "",
  });

  useEffect(() => {});
  const sendMessage = () => {
    setMessage("");
    mutate(
      {
        message,
        from: userInfo.id,
        to: currentChatUser.id,
      },
      {
        onError: () => {},
        onSuccess: (result) => {
          socket.current.emit("send-msg", {
            to: currentChatUser.id,
            from: userInfo.id,
            message: result,
          });
          updateMessageCache({
            newMessage: {
              ...result,
            },
            fromSelf: true,
          });
        },
      }
    );
  };

  useEffect(() => {
    setMessage("");
  }, [currentChatUser]);

  return (
    <div className="border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col h-[100vh] z-10 ">
      <ChatHeader currentChatUser={currentChatUser} onlineUsers={onlineUsers} />
      <ChatContainer
        userInfo={userInfo}
        currentChatUser={currentChatUser}
        messages={messages || []}
      />
      <MessageBar
        sendMessage={sendMessage}
        socket={socket}
        userInfo={userInfo}
        currentChatUser={currentChatUser}
        setMessage={setMessage}
        message={message}
      />
    </div>
  );
}
