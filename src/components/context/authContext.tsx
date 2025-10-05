import { type ReactNode, createContext, useState, useEffect } from "react";
import { auth, db } from "@/services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

interface AuthProviderProps{
    children: ReactNode
}

type AuthContextData = {
    signed: boolean;
    loadingAuth: boolean;
    user: UserProps | null;
    handleUpdateUser:({uid, name, email}: UserProps) => void;
    cars: CarProps[];
}

interface UserProps{
    uid: string;
    name: string | null;
    email: string | null;
}

interface CarProps{
    idUser: string,
    name: string,
    model: string,
    year: string,
    km: string,
    price: string,
    city: string,
    whatsapp: string,
    description: string,
    createdAt: string
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({children}: AuthProviderProps){

    const[user, setUser] = useState<UserProps | null>(null);
    const[loadingAuth, setLoadingAuth] = useState(true);
    const[cars, setCars] = useState<CarProps[]>([]);

    useEffect(()=>{

        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser({
                    uid: user.uid,
                    name: user?.displayName,
                    email: user?.email
                })
                setLoadingAuth(false)
            } else {
                setUser(null)
                setLoadingAuth(false)
            }
        })

async function getCars(){
    const carsRef = collection(db, "cars")
    const queryRef = query(carsRef, orderBy("createdAt", "desc"));
  
    const unsub = onSnapshot(queryRef, (snapshot) => {
      let allCars = [] as CarProps[];
  
      snapshot.forEach((doc)=>{
        allCars.push({
          idUser: doc.data().idUser,
          name: doc.data().name,
          model: doc.data().model,
          year: doc.data().year,
          km: doc.data().km,
          price: doc.data().price,
          city: doc.data().city,
          whatsapp: doc.data().city,
          description: doc.data().description,
          createdAt: doc.data().createdAt,
        })
      })
        setCars(allCars)
    })
  }

  getCars()

        return () =>{
            unsub();
        }


    }, [cars])


     function handleUpdateUser({uid, name, email}: UserProps){
        setUser({
            uid,
            name,
            email
        })
    }

    return(
        <>
        <AuthContext.Provider value={{
            signed: !!user,
            loadingAuth, 
            user,
            handleUpdateUser,
            cars
            }}>
            {children}
        </AuthContext.Provider>
        </>
    )
}

export default AuthProvider;