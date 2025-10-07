import { LogIn, User } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router";

export  function Header(){

    const {signed, loadingAuth, user} = useContext(AuthContext)
    return(
        <header className="shadow-md p-4 bg-white">
            <div className="flex justify-between mx-5">
               <Link to="/">
                   <h1 className="text-red-600 text-2xl font-bold">LowPrice<span className="text-black">Cars🏎</span></h1>
               </Link>
               {signed === false && loadingAuth === false &&(
                 <button className="cursor-pointer"><Link to="/login"><LogIn/></Link></button> 
                 )}
                 {signed && loadingAuth === false&&(
                      <div className="flex gap-2 items-center justify-center">
                    <span>{user?.name}</span>
                     <button className="curso-pointer bg-red-600 text-white rounded-full h-8 w-8 flex items-center justify-center"><User/></button>
                </div> 
                 )}        
            </div>
        </header>
    )
}