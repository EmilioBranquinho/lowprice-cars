import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router";

interface ChildProps{
    children: ReactNode
}

export default function Private({children}: ChildProps){

    const {signed, loadingAuth} = useContext(AuthContext)


    if(loadingAuth){
        return <div className="h-screen items-center justify-center"> <div className="text-3xl">Carregando...</div></div>
    }

  if(!signed){
    return <Navigate to="/login"/>
  }

    return(
        <>
        {children}
        </>
    )
}