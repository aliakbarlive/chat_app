function Navbar() {
  //   const { user, setUser, setToken } = useAuthContext();
  //   const { setChatInfo } = useChatContext();
  //   const {
  //     socketValue: { socket, socketId },
  //     resetSocketValue,
  //   } = useSocketContext();
  //   const handleLogout = () => {
  //     setUser(null);
  //     setToken(null);
  //     setChatInfo(null);
  //     if (socketId) {
  //     //   socketEmitEvent(socket).userOffline(user._id);
  //       console.log("DISCONNECT");
  //       resetSocketValue();
  //       socket.disconnect();
  //     }
  //   };

  return (
    <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
      <h3 className="text-sm font-semibold">Chat App</h3>
      <div className="relative">
        <button id="menuButton" className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-100"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
