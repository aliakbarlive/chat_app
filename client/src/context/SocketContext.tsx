import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";
import { initSocket } from "../services/socket";

type SocketContextProviderProps = {
  children: ReactNode;
};

const INIT_SOCKET_STATE = {
  socket: null,
  socketId: null,
  onlineUsers: null,
  messageData: null,
  messageReadStatus: null,
  typingNotify: null,
  roomNotify: null,
  invitedNotify: null,
};

const SocketContext = createContext(INIT_SOCKET_STATE);
export const useSocketContext = () => useContext(SocketContext);

function SocketContextProvider({ children }: SocketContextProviderProps) {
  const [socketValue, setSocketValue] = useState(INIT_SOCKET_STATE);

  const socketConnect = useCallback(() => {
    return initSocket({ setSocketValue });
  }, []);

  const resetSocketValue = useCallback((key: string) => {
    key
      ? setSocketValue((prev) => ({ ...prev, [key]: null }))
      : setSocketValue(INIT_SOCKET_STATE);
  }, []);

  return (
    <SocketContext.Provider
      value={{ socketConnect, socketValue, setSocketValue, resetSocketValue }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
