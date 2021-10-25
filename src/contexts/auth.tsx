import { createContext, ReactNode, useState } from "react";

type AuthResponse = {
  token: string;
  user: {
    id: string;
    userName: string;
    userPassword: string;
    isAdmin: boolean;
  };
};

type User = {
  id: string;
  userName: string;
  userPassword: string;
  isAdmin: boolean;
};

type AuthContextData = {
  user: User | null;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider =  {
  children: ReactNode;
}

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={{user}}>
      {props.children}
    </AuthContext.Provider>
  )
}
