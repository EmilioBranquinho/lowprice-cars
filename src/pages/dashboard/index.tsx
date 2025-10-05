import { Container } from "@/components/Container"
import { AuthContext } from "@/components/context/authContext"
import { DashboardHeader } from "@/components/DashboardHeader"
import { db } from "@/services/firebaseConnection"
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import type { ImgProps } from "./new"


function Dashboard() {

  const {user, cars} = useContext(AuthContext)
  const[images, setImages] = useState<ImgProps[]>([]);

  useEffect(()=>{
 
  async function getImages(){
       const imgRef = collection(db, "images");
       const queryRef = query(imgRef, orderBy("createdAt", "desc"));
  
      getDocs(queryRef)
        .then((snapshot) =>{
          let allImg = [] as ImgProps[];
            
            snapshot.forEach((doc) =>{
               allImg.push({
                  image: doc.data().image,
                  userId: doc.data().userId
      })
      })
              setImages(allImg)
    })
    }
      getImages()

  }, [images])

  

  return (
    <>
    <Container>
      <DashboardHeader/>
      <h1 className="text-center mt-10">Meus carros</h1>
        <main className="grid gird-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {cars.filter((car)=> car.idUser === user?.uid).map((car)=>(
            <>
            <section className="w-full bg-white rounded-lg">
              {images.filter((image)=> image.userId === user?.uid).map((image)=>(
                <>
            <img
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
            src={image.image}
            alt="Carro" 
          />
                </>
              ))}
          <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano {car.year} | {car.km} km</span>
            <strong className="text-black font-medium text-xl">MZN {car.price}</strong>
          </div>
          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div className="px-2 pb-2">
            <span className="text-black">
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
