import { Outlet } from "react-router";
import { Header } from "../Header";

function Layout(){
    return(
        <>
        <Header/>
        <div className="bg-gray-100 mt-1"><Outlet/></div>
        </>
    )
}

export default Layout