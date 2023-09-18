import { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

export default function MessageBar({
  socket,
  currentChatUser,
  userInfo,
  sendMessage,
  setMessage,
  message,
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onSendMessage = async () => {
    sendMessage();
  };

  const handleEmojiModal = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji, event) => {
    setMessage((prevMessage) => (prevMessage += emoji.emoji));
  };

  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(event.target)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="bg-panel-header-background  h-20 px-4 flex items-center gap-6  relative">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Emoji"
            onClick={handleEmojiModal}
            id="emoji-open"
          />
          {showEmojiPicker && (
            <div
              className="absolute bottom-24 left-16 z-40"
              ref={emojiPickerRef}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}
        </div>
        <div className="w-full rounded-lg h-10 flex items-center">
          <input
            type="text"
            placeholder="Type a message"
            className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg pl-5 pr-5 py-4 w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className=" w-10 flex items-center justify-center">
          {message.length && (
            <button onClick={onSendMessage}>
              <MdSend
                className="text-panel-header-icon cursor-pointer text-xl"
                title="Send"
              />
            </button>
          )}
        </div>
      </>
    </div>
  );
}
