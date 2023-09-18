import React, { useState } from "react";
import Avatar from "../common/Avatar";
import {
  BsFillChatLeftTextFill,
  BsThreeDotsVertical,
  BsFillBellFill,
} from "react-icons/bs";
import ContextMenu from "../common/ContextMenu";
import { useNavigate } from "react-router-dom";

export default function ChatListHeader({
  userInfo,
  handleAllContactsPage,
  notificationCount = 0,
  onClickNotification,
}) {
  const navigate = useNavigate();
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  const contextMenuOptions = [
    {
      name: "Logout",
      callBack: async () => {
        setIsContextMenuVisible(false);
        navigate("/logout");
      },
    },
  ];
  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.profilePicture} />
      </div>
      <div className="flex gap-6 ">
        <BsFillChatLeftTextFill
          className="text-panel-header-icon cursor-pointer text-xl"
          title="New chat"
          onClick={handleAllContactsPage}
        />

        <div className="relative text-xl">
          <BsFillBellFill
            className="text-panel-header-icon cursor-pointer"
            title="New chat"
            onClick={onClickNotification}
          />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-6 h-6 text-center">
              {notificationCount}
            </span>
          )}
        </div>
        <>
          <BsThreeDotsVertical
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Menu"
            onClick={(e) => showContextMenu(e)}
            id="context-opener"
          />
          {isContextMenuVisible && (
            <ContextMenu
              options={contextMenuOptions}
              cordinates={contextMenuCordinates}
              contextMenu={isContextMenuVisible}
              setContextMenu={setIsContextMenuVisible}
            />
          )}
        </>
      </div>
    </div>
  );
}
