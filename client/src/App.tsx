import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "./context/AuthContext";
import ChatContextProvider from "./context/ChatContext";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <ChatContextProvider>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" replace={true} />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace={true} /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" replace={true} /> : <SignUp />}
          />
        </Routes>
        <ToastContainer />
      </ChatContextProvider>
    </>
  );
}

export default App;
