import { createContext, useState } from "react";

const UserContext = createContext({
  isLogged: false,
  user: {}
});

export default UserContext;

export const UserContextProvider = ({ children }) => {
  
  const [user, setUser] = useState({});

  const [isLogged, setIsLogged] = useState(false);

  const login = (data) => {
    setUser(data)
    setIsLogged(true)
  }
  const logout = () => {
    setIsLogged(false);
    setUser({});
  }

  const context = {
    login, 
    logout, 
    user,
    isLogged
  }

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  )


}