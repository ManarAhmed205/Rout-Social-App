import { createContext, useEffect, useState, type ReactNode } from "react";
import {jwtDecode} from "jwt-decode"

type AuthContextType = {
  userLogin: string | null;
  setuserLogin: (value: string | null) => void;

  token: string | null;
  setToken: (token: string | null) => void;
  userId : string
};

export const AuthContext = createContext<AuthContextType>({
  userLogin : null,
  setuserLogin : () => {},
   token: null,
    setToken: () => {},
  userId : ""


});
export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userLogin, setuserLogin] = useState(function (){ return localStorage.getItem("userToken");});
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("userToken"),
  );
  const [userId, setuserId] = useState("")
//   useEffect(()=>{
// if (localStorage.getItem("userToken")){
//     setuserLogin(localStorage.getItem("userToken"))
// }
//   },[])
useEffect(() => {
  const token = localStorage.getItem("userToken");
  if(token){
const {user} : {user : string} = jwtDecode(token)
setuserId(user)
  }
} , [userLogin])


  return (
    <AuthContext.Provider value={{ userLogin, setuserLogin, token, setToken ,userId }}>
      {children}
    </AuthContext.Provider>
  );
}
