import ChatListItem from "./ChatListItem";

export default function List({
  userContacts,
  userInfo,
  filteredContacts,
  handleContactClick,
  currentChatUser,
}) {
  return (
    <div className="bg-search-input-container-background flex-auto overflow-auto max-h-full custom-scrollbar">
      {filteredContacts && filteredContacts.length > 0
        ? filteredContacts.map((contact) => {
            return (
              <ChatListItem
                data={contact}
                key={contact.id}
                handleContactClick={handleContactClick}
                userInfo={userInfo}
                currentChatUser={currentChatUser}
              />
            );
          })
        : userContacts.map((contact) => {
            return (
              <ChatListItem
                data={contact}
                key={contact.id}
                handleContactClick={handleContactClick}
                currentChatUser={currentChatUser}
                userInfo={userInfo}
              />
            );
          })}
    </div>
  );
}
