import { Link } from "react-router";

export function DashboardHeader(){
    return(
        <>
        <div className="bg-red-600 lg:mx-20 rounded-lg flex gap-10 items-center justify-start mt-5 h-14 text-white font-thin">
        <span className="ml-5">
            <Link to="/dashboard">Dashboard</Link>
        </span>
        <span>
            <Link to="/dashboard/new">Cadastrar carro</Link>
        </span>
        </div>
        </>
    )
}