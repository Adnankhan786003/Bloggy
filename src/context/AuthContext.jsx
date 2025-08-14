import { createContext, useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isSigned = onAuthStateChanged(auth, (currentuser) => {
      if(currentuser){
        setUser(currentuser)

      }else{
        setUser(null)
      }

    });

    return () => isSigned();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

