import { useState,createContext, Children } from "react";

export const Authcontext = createContext()

export const isAuthProvider = ({Children}) => {
    const [isAuth,setisAuth] = useState(false)

    return (
        <Authcontext.Provider value={ {isAuth,setisAuth }}>
            {Children}
        </Authcontext.Provider>
    )
}

