import { createContext, useState, useEffect, type ReactNode } from "react";

type User = {
  id: number;
  username: string;
  role: string;
} | null;

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default UserContext;

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

useEffect(() => {
    const getUser = async () => {
        try {
            const URL = "http://localhost:4000/api/me"
            const response = await fetch(URL, {
                  credentials: "include"
            })
            const data = await response.json();

            if (data.user) {
                setUser(data.user);
            }

        } catch (error) {
            console.log("Error getting user:", error)
        }
    }
    getUser();
},[])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};