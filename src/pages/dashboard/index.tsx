import { Container } from "@/components/Container"
import { AuthContext } from "@/components/context/authContext"
import { DashboardHeader } from "@/components/DashboardHeader"
import { db } from "@/services/firebaseConnection"
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { MapPin, Trash } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import type { CarProps } from "../home"

function Dashboard() {

  const[cars, setCars] = useState<CarProps[]>([]);
  const {user} = useContext(AuthContext)
  
      useEffect(()=>{
        async function getCars(){
            const carsRef = collection(db, "cars")
            const queryRef = query(carsRef, where("idUser", "==", user?.uid));
          
            getDocs(queryRef)
            .then((snapshot)=>{
              let allCars = [] as CarProps[];
  
               snapshot.forEach((doc)=>{
                allCars.push({
                  id: doc.id,
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
                  owner: doc.data().owner,
                  images: doc.data().images
                })
              })
                setCars(allCars)
            }) 
                      
     }
        getCars()
      }, [cars])


      async function handleDeleteCar(id: string){
        await deleteDoc(doc(db, "cars", id))
        .then(()=>{
          setCars(cars.filter(car => car.id !== id))
        })

      }

  return (
    <>
    <Container>
      <DashboardHeader/>
      <h1 className="text-center mt-10">Meus carros</h1>
        <main className="grid gird-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-5">
        {cars.map((car)=>(
            <>
            <section key={car.name} className="w-full bg-white rounded-lg shadow-md">
            <button onClick={()=>handleDeleteCar(car.id)} className="absolute text-red-600 bg-black rounded-full w-8 h-8 flex items-center justify-center ml-2 mt-2 cursor-pointer">
              <Trash size={18}/>
            </button>
            <img
            className="w-full rounded-lg mb-2 min-h-52 max-h-52"
            src={car.images[0].link}
            alt="Carro" 
          />
          <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano {car.year} | {car.km} km</span>
            <strong className="text-black font-medium text-xl">MZN {car.price}</strong>
          </div>
          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div className="px-2 pb-2">
            <span className="text-black flex">
              <i><MapPin className="text-red-600"/></i>
              {car.city}
            </span>
          </div>
        </section>
            </>
          ))}
      </main>
    </Container>
    </>  
  )
}

export default Dashboard
