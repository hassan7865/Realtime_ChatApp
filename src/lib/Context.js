import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./Firebase";
export const AuthContext = createContext()
export const AuthContextProvider = ({children})=>{
    const[currentuser,setcurrentuser] = useState("user")
    useEffect(()=>{
       const unsub =  onAuthStateChanged(auth,(user)=>{
            setcurrentuser(user)
        })
        return()=>{
            unsub()
        }
    },[])
    return(
    <AuthContext.Provider value={currentuser}>
        {children}
    </AuthContext.Provider>
    )
}
