import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAxios } from "../hooks/useAxios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { chatApi } from "../services/api";
import { useAuthContext } from "./AuthContext";
import { useSocketContext } from "./SocketContext";

type ChatContextProviderProps = {
  children: ReactNode;
};

type Contact = {
  _id: string;
  name: string;
  isOnline: boolean;
};

type LatestMessageData = {
  _id: string;
  chatId: string;
  userId: string;
  type: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  sender: string;
  recipient: string;
  updateId: string;
  unreadCount: number;
};

type SelectedChat = {
  _id: string;
  name: string;
  avatar: string;
  chatType: string;
  createdAt: string;
  updatedAt: string;
  unreadCount: number;
};
export const ChatContext = createContext({});

export const useChatContext = () => useContext(ChatContext);

function ChatContextProvider({ children }: ChatContextProviderProps) {
  const { user } = useAuthContext();
  const {
    socketValue: { socket, onlineUsers, messageData },
  } = useSocketContext();
  const [chatInfo, setChatInfo] = useLocalStorage("chat-info", null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { sendRequest: getUserContacts } = useAxios();
  const { sendRequest: updateReadStatus } = useAxios();

  const chatId: string | null = (chatInfo && chatInfo?._id) || null;

  const fetchUserContacts = useCallback(() => {
    if (user) {
      return getUserContacts(
        {
          method: "GET",
          url: chatApi.getUserContacts(user._id),
        },
        (data) => {
          const contactsWithOnlineStatus = data.data.map(
            (contact: Contact) => ({
              ...contact,
              isOnline:
                onlineUsers?.some(
                  (user: Contact) => user._id === contact._id
                ) || false,
            })
          );
          setContacts(contactsWithOnlineStatus);
        }
      );
    }
  }, [user, getUserContacts, onlineUsers]);

  useEffect(() => {
    fetchUserContacts();
  }, [fetchUserContacts]);

  const updateContactLatestMessage = useCallback(
    (latestMessageData: LatestMessageData) => {
      const { updateId, sender, message, updatedAt, unreadCount } =
        latestMessageData;

      setContacts((prevContact) =>
        prevContact.map((contact) => {
          return contact._id === updateId
            ? {
                ...contact,
                latestMessage: message,
                latestMessageSender: sender,
                latestMessageUpdatedAt: updatedAt,
                unreadCount: chatId === sender ? 0 : unreadCount,
              }
            : contact;
        })
      );
    },
    [chatId]
  );

  useEffect(() => {
    if (messageData) {
      const { type, receiver, sender } = messageData;
      updateContactLatestMessage({
        ...messageData,
        updateId: type === "room" ? receiver : sender,
      });
    }
  }, [messageData, updateContactLatestMessage]);

  const updateMessageStatusToRead = (chatId: string, type: string) => {
    updateReadStatus({
      method: "PUT",
      url: chatApi.updateReadStatus({
        userId: user._id,
        chatId,
        type,
      }),
    });
    socketEmitEvent(socket).updateMessageReaders({
      readerId: user._id,
      toId: chatId,
      type,
    });
  };
  const handleChatSelect = async (selected: SelectedChat) => {
    if (selected._id !== chatId) {
      //   if (selected.chatType === 'room') {
      //     socketEmitEvent(socket).enterChatRoom({ roomId: selected._id, message: `${user.name}` });
      //   }
      //   if (chatInfo?.chatType === 'room') {
      //     socketEmitEvent(socket).leaveChatRoom({ roomId: chatId, message: `${user.name} ` });
      //   }
      setChatInfo(selected);
      updateMessageStatusToRead(selected._id, selected.chatType);
      setContacts((prevContacts) =>
        prevContacts.map((prev) =>
          prev._id === selected._id ? { ...prev, unreadCount: 0 } : prev
        )
      );
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chatId,
        chatInfo,
        setChatInfo,
        contacts,
        setContacts,
        handleChatSelect,
        updateContactLatestMessage,
        updateMessageStatusToRead,
        fetchUserContacts,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
