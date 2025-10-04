import { AuthContext } from "@/components/context/authContext"
import { useContext } from "react"

function Dashboard() {

    const {signed} = useContext(AuthContext)

    console.log(signed)

  return (
    <>
    <h1>Pagina Dashboard</h1> 
    </>  
  )
}

export default Dashboard
