import { Button } from "@/components/ui/button"
import { MapPin, Search } from "lucide-react";
import { Container } from "@/components/Container";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { SkeletonCard } from "@/components/skeleton-card";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import type { ImageItemProps } from "../dashboard/new";

interface CarProps{
    id: string,
    idUser: string,
    name: string,
    model: string,
    year: string,
    km: string,
    price: string,
    city: string,
    whatsapp: string,
    description: string,
    createdAt: string,
    owner: string;
    images: ImageItemProps[]
}

function Home() {

    const[loadImages, setLoadImages] = useState<string[]>([]);
    const[cars, setCars] = useState<CarProps[]>([]);
    const[inputSearch, setInputSearch] = useState("");

    useEffect(()=>{

      getCars()
    }, [])

    async function getCars(){
          const carsRef = collection(db, "cars")
          const queryRef = query(carsRef, orderBy("createdAt", "desc"));
        
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

  async function handleSearchCar(){
    if(inputSearch === ""){
      getCars()
      return;
    }

    setCars([])
    setLoadImages([])

    const q = query(collection(db, "cars"), 
    where("name", ">=", inputSearch.toUpperCase()),
    where("name", "<=", inputSearch.toUpperCase() +"\uf8ff")
    )

    const querySnapshot = await getDocs(q)

    let searchedCars = [] as CarProps[];

    querySnapshot.forEach((doc)=>{
      searchedCars.push({
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
    setCars(searchedCars)
    console.log(searchedCars)
  }


    function handleImageLoad(id:string){
      setLoadImages((prev) => [...prev, id])
    }

  return (
    <>
    <Container>
      <section className="pt-3 w-full max-w-3xl mx-auto flex justify-center items-center">
        <input
            type="text"
            className="bg-white lg:w-3xl rounded-r-none"
            placeholder="Pesquise por carros:"
            name="search"
            value={inputSearch}
            onChange={e=>{setInputSearch(e.target.value)}}
            />
       <Button onClick={handleSearchCar} className="rounded-l-none bg-red-600"><Search/></Button>
      </section> 
        <h1 className="text-center mt-10 text-3xl  font-medium">Carros novos e usados</h1>
          <main className="grid gird-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-5">
        {cars.map((car)=>(
            <>
            <Link to={`car/${car.id}`} key={car.id}>
              <section className="lg:min-w-72 lg:max-w-72 bg-white rounded-lg shadow-md">
              <div
              style={{ display: loadImages.includes(car.id) ? "none" : "block"}}
              >
               <SkeletonCard/> 
              </div>
              <img
              className="w-full rounded-lg mb-2 min-h-[230px] max-h-[230px] hover:scale-105 transition-all"
              src={car.images[0].link}
              alt="Carro" 
              onLoad={() => handleImageLoad(car.id)}
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
            </Link>
            </>
          ))}
      </main>
    </Container>
    </>  
  )
}

export default Home
export type {CarProps}