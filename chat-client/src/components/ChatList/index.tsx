import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChatListHeader from "./ChatListHeader";
import List from "./List";
import SearchBar from "./SearchBar";
import ContactsList from "./ContactsList";
import { useReadCachAppContext } from "@/caches/reads/appContext";
import { useQueryGetMessageFromUser } from "@/operations/queries/message";
import {
  useWriteCacheAppContext,
  useWriteCacheCurrentChatUser,
} from "@/caches/writes/appContext";
import { useGetAllContactsQuery } from "@/operations/queries/user";

export default function ChatList() {
  const appContext = useReadCachAppContext();
  const updateAppContext = useWriteCacheAppContext();
  const {
    currentChatUser,
    profile: userInfo,
    contactSearch,
    contactsPage,
    notifications,
  } = appContext;
  const [pageType, setPageType] = useState("default");

  useEffect(() => {
    if (contactsPage) {
      setPageType("all-contacts");
    } else {
      setPageType("default");
    }
  }, [contactsPage]);

  const { data: userContacts } = useQueryGetMessageFromUser({
    from: userInfo.id,
  });

  const updateCurrentChatUser = useWriteCacheCurrentChatUser();
  const { data: allContacts } = useGetAllContactsQuery({});

  const onSetAllContactPage = (e: any) => {
    updateAppContext({ contactsPage: e.target.value });
  };

  const onSearchChange = (e: any) => {
    updateAppContext({ contactSearch: e.target.value });
  };

  const handleAllContactsPage = () => {
    updateAppContext({ contactsPage: !contactsPage });
  };

  const handleContactClick = useCallback((data) => {
    updateCurrentChatUser({
      name: data.name,
      about: data.about,
      profilePicture: data.profilePicture,
      status: data.status,
      email: data.email,
      id: data.id,
    });
  }, []);
  const filteredContacts = useMemo(() => {
    if (userContacts && userContacts.users) {
      return userContacts.users.filter((contact) =>
        contact.name.toLowerCase().includes(contactSearch?.toLowerCase())
      );
    }
    return [];
  }, [userContacts]);

  const onClickNotification = () => {
    updateAppContext({ notifications: [] });
  };

  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen z-20 ">
      {pageType === "default" && (
        <>
          <ChatListHeader
            userInfo={userInfo}
            handleAllContactsPage={handleAllContactsPage}
            notificationCount={notifications?.length || 0}
            onClickNotification={onClickNotification}
          />
          <SearchBar
            onSearchChange={onSearchChange}
            contactSearch={contactSearch}
          />
          <List
            userContacts={userContacts?.users || []}
            userInfo={userInfo}
            filteredContacts={filteredContacts}
            handleContactClick={handleContactClick}
            currentChatUser={currentChatUser}
          />
        </>
      )}
      {pageType === "all-contacts" && (
        <ContactsList
          onSetAllContactPage={onSetAllContactPage}
          allContacts={allContacts}
          handleContactClick={handleContactClick}
        />
      )}
    </div>
  );
}
