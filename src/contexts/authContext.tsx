import { auth } from "../firebaseConfig";
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

const AuthContext = createContext<{ user: User | null }>({ user: null });

export const AuthProvider = ({children} : {children : React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => unsubscribe();
     }, [])

     return (
        <AuthContext.Provider value = {{ user }}>
            { children }
        </AuthContext.Provider>
     )
}

export const useAuth = () => useContext(AuthContext);