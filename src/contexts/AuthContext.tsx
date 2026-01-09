import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getCurrentUser,
  signIn as apiSignIn,
  logOut as apiLogOut,
  signUp as apiSignUp,
} from "../services/api";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  logOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const user = getCurrentUser();
      console.log("Current user loaded:", user);
      setCurrentUser(user);
      setLoading(false);

      const handleStorageChange = () => {
        const updatedUser = getCurrentUser();
        setCurrentUser(updatedUser);
      };

      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    } catch (error) {
      console.error("Error in AuthProvider:", error);
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const user = await apiSignIn(email, password);
    setCurrentUser(user);
  };

  const signUp = async (email: string, password: string) => {
    const user = await apiSignUp(email, password);
    setCurrentUser(user);
  };

  const logOut = async () => {
    await apiLogOut();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
