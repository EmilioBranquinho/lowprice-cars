import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router";
import { Spinner } from "../ui/shadcn-io/spinner";

interface ChildProps{
    children: ReactNode
}

export default function Private({children}: ChildProps){

    const {signed, loadingAuth} = useContext(AuthContext)

    if(loadingAuth){
        return <div className="h-screen flex items-center justify-center"> <div className="text-3xl"><Spinner color="red" variant="pinwheel"/></div></div>
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