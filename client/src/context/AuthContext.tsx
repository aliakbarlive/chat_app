import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext: any = () => useContext(AuthContext);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useLocalStorage("app-user", null);
  const [token, setToken] = useLocalStorage("app-user-token", null);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
