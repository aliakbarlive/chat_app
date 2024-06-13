import { useAuthContext } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";
import { useSocketContext } from "../context/SocketContext";

function Navbar() {
  const { user, setUser, setToken } = useAuthContext();
  const { setChatInfo } = useChatContext();
  const {
    socketValue: { socket, socketId },
    resetSocketValue,
  } = useSocketContext();
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setChatInfo(null);
    if (socketId) {
      //   socketEmitEvent(socket).userOffline(user._id);
      console.log("DISCONNECT");
      resetSocketValue();
      socket.disconnect();
    }
  };

  return (
    <header className="flex justify-between items-center bg-white p-4 text-white">
      <h1 className="text-2xl font-semibold">{ "test"}</h1>
      <button
        id="menuButton"
        className="focus:outline-none"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
}

export default Navbar;
