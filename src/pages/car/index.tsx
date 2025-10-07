import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import type { CarProps } from "../home";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import { Container } from "@/components/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Spinner } from "@/components/ui/shadcn-io/spinner";

function CarDetails() {

  const {id} = useParams();
  const[carDetails, setCarDetails] = useState<CarProps>();
  const[sliderPreview, setSliderPreview] = useState<number>(2);
  const[loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    getCarDetals();
    
    handleResize();

    window.addEventListener("resize", handleResize);

    return;
  });

function getCarDetals(){
    const docRef = doc(db, "cars", id)
    getDoc(docRef)
    .then((snapshot)=>{

    if(!snapshot.data()){
        navigate('/')
    }
      setCarDetails({
        id: snapshot.id,
        idUser: snapshot.data()?.idUser,
        name: snapshot.data()?.name,
        year: snapshot.data()?.year,
        city: snapshot.data()?.city,
        km: snapshot.data()?.km,
        price: snapshot.data()?.price,
        model:snapshot.data()?.model,
        description: snapshot.data()?.description,
        whatsapp: snapshot.data()?.whatsapp,
        owner: snapshot.data()?.owner,
        images: snapshot.data()?.images,
        createdAt: snapshot.data()?.createdAt
      });
      setLoading(false)
    });
};

function handleResize(){
  if(window.innerWidth < 720){
        setSliderPreview(1)
      } else {
        setSliderPreview(2)
      }
  };

    if(loading){
        return <div className="flex h-screen items-center justify-center"><div><Spinner color="red"/></div></div>
      }

  return (
    <>
    <Container>
      {carDetails &&(
      <Swiper
      className="mt-3 lg:mx-4"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={sliderPreview}
      navigation
      pagination={{ clickable: true }}
      >
      {carDetails?.images.map((image) => (
      <SwiperSlide key={image.id} className="flex justify-center items-center">
      <img
      src={image.link}
      className="w-full h-80 object-cover rounded-sm"
      />
      </SwiperSlide>
      ))}
      </Swiper>
      )}
      
      {carDetails &&(
        <>
        <main className="w-full rounded-lg border py-6 shadow-sm lg:mx-4 h-auto mt-3">
          <div className="flex justify-between mx-4 md:text-3xl font-bold text-lg ">
            <h1>{carDetails?.name}</h1>
            <h1>MZN {carDetails.price}</h1>
          </div>
          <div className="mx-4">
            <p>{carDetails.model}</p>
          </div>
          <div className="flex gap-10 items-center mx-4 mt-5">
          <div className="flex flex-col">
            <span>Cidade</span>
            <h1 className="font-semibold">{carDetails?.city}</h1>
          </div>
          <div className="flex flex-col">
            <span>Ano</span>
            <h1 className="font-semibold">{carDetails?.year}</h1>
          </div>
            <div className="flex flex-col">
            <span>Km</span>
            <h1 className="font-semibold">{carDetails?.km}</h1>
          </div>
          </div>
          <div className="mt-5 lg:mt-10 mx-4 flex flex-col gap-2 w-auto">
            <h1 className="font-semibold">Descrição</h1>
            <p className="">{carDetails?.description}</p>
          </div>
          <div className="mt-5 lg:mt-10 mx-4 flex flex-col">
            <h1 className="font-semibold">Telefone</h1>
            <p>{carDetails?.whatsapp}</p>
          </div>
          <a 
          href={`https://api.whatsapp.com/send?phone=${carDetails.whatsapp}&text= Olá, vi esse ${carDetails.name} no site LowPrice cars e fiquei interessado`} 
          className="w-auto flex items-center justify-center mx-4 bg-green-600 cursor-pointer rounded-md text-white h-10 mt-3 font-medium"
          target="_blank"
          >
            Enviar mensagem no whatsApp
          </a>
        </main>
        </>
      )}
    </Container>
    </>  
  )
}

export default CarDetails
