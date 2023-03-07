import { createContext, useState } from "react";

const UserContext = createContext({
  isLogged: true,
  user: {
    firstName:"Vincent"
  }
});

export default UserContext;

export const UserContextProvider = ({ children }) => {
  
  const [user, setUser] = useState({
    firstName: "vincent"
  });

  const [isLogged, setIsLogged] = useState(true);

  const login = () => {
    setIsLogged(
      {isLogged:true}
    )
  }
  const logout = () => {
    setIsLogged(
      {isLogged:false}
    )
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