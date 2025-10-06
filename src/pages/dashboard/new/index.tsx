import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Container } from "@/components/Container"
import { DashboardHeader } from "@/components/DashboardHeader"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trash, Upload } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useContext, useEffect, useMemo, useState, type ChangeEvent } from "react"
import { AuthContext } from "@/components/context/authContext"
import { collection, addDoc, query, orderBy, getDocs, doc, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/services/firebaseConnection"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import toast from "react-hot-toast"

interface ImageItemProps{
  id: string;
  userId: string | undefined;
  link: string;
}

  const schema = z.object({
    name: z.string().nonempty("O nome não pode ficar vazio"),
    model: z.string().nonempty("O modelo não pode ficar vazio"),
    year: z.string().nonempty("O ano não pode fica vazio"),
    km: z.string().nonempty("Este campo não pode ficar vazio"),
    price: z.string().nonempty("O preço não pode ficar vazio"),
    city: z.string().nonempty("A o campo da cidade não pode ficar vazio"),
     whatsapp: z.string().min(1, "O Whatsapp é obrigatório").refine((value) => /^(\d{9,13})$/.test(value), {
      message: "Número de telefone inválido"
    }),
    description: z.string().nonempty("A descrição não pode ficar vazia"),
  })

  type FormData = z.infer<typeof schema>;

function NewCar() {

  const {user} = useContext(AuthContext);
  const[carImages, setCarImages] = useState<ImageItemProps[]>([]);
  const[loading, setLoading] = useState(false);

  const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;

  if (file.type === "image/jpeg" || file.type === "image/png") {
    handleUpload(file);
  } else {
    alert("O formato da imagem deve ser PNG ou JPEG");
  }
}

 
async function handleUpload(image: File) {
  if (!user?.uid) return;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "unsigned_upload"); // <-- muda pro teu nome do preset

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dhgrgidm7/image/upload", // <-- muda "teu_nome"
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    // URL da imagem no Cloudinary:
    const imageUrl = data.secure_url;

    // Guarda no Firestore:
    const ImagesRef = collection(db, "images");
    const docRef = await addDoc(ImagesRef, {
      userId: user.uid,
      imageUrl,
      createdAt: new Date(),
    });

    // Atualiza estado local:
    const newImage = {
      id: docRef.id,
      userId: user.uid,
      link: imageUrl,
    };

    setCarImages((prev) => [...prev, newImage]);
  } catch (error) {
    console.error("Erro ao enviar imagem:", error);
  }
}

function handleRegister(data: FormData){
  setLoading(true)
  if(carImages.length === 0){
    toast.error("Envie alguma imagem!")
    setLoading(false)
    return;
  }

  addDoc(collection(db, "cars"), {
    // id: 
    idUser: user?.uid,
    name: data.name.toUpperCase(),
    model: data.model,
    year: data.year,
    km: data.km,
    price: data.price,
    city: data.city,
    whatsapp: data.whatsapp,
    description: data.description,
    createdAt: new Date(),
    owner: user?.name,
    images: carImages
  })
  .then(()=>{
    reset();
    setCarImages([]);
    setLoading(false)
    toast.success(`Carro cadastrado com sucesso!🤝`)
  })
  .catch((error)=>{
    console.log(error)
    setLoading(false)
  })
}

const userImages = useMemo(
  () => carImages.filter((image) => image.userId === user?.uid),
  [carImages, user?.uid]
);


async function handleDeleteImage(id: string) {
  try {
    await deleteDoc(doc(db, "images", id));
    setCarImages((prev) => prev.filter((img) => img.id !== id));
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
  }
}

if(loading){
  return <div className="flex items-center justify-center h-screen">
    <div><Spinner/></div>
    </div>
}


  return (
    <>
  <Container>
      <DashboardHeader/>
      <div className="w-full rounded-lg border py-6 shadow-sm flex flex-col sm:flex-row items-center gap-2 h-40 mt-5">
        <button className="border-2 h-36 w-48 rounded-lg flex items-center justify-center ml-3">
          <div className="absolute cursor-pointer flex items-center justify-center flex-col">
            <Upload color="black"/>
            <span className="text-gray-400">Adicione fotos do carro</span>
          </div>
          <div className="cursor-pointer">
            <input 
            type="file" 
            accept="image/*" 
            className="opacity-0 cursor-pointer"
            onChange={handleFile}
            />
          </div>
        </button>
         {userImages.length > 0 && userImages.map((image)=>(
          <>
          <div key={image.link} className="border-2 h-36 w-full relative rounded-lg flex items-center justify-center ml-3">
           <button onClick={()=>handleDeleteImage(image.id)} className="absolute">
            <Trash className="cursor-pointer" color="red"/>
          </button>
          <img 
            className="w-full h-full" 
            src={image.link}
           />
        </div>
          </>
         ))}  
      </div>

      <div className="w-full p-3 rounded-lg border py-6 shadow-sm flex flex-col sm:flex-row gap-2 mt-2 max-h-4/5">
    <form onSubmit={handleSubmit(handleRegister)}  className="w-full space-y-3">
      <FieldSet>
        <FieldGroup>
          <div className="flex flex-col flex-wrap lg:flex-row gap-5 w-full">
            <Field>
            <FieldLabel htmlFor="street">Nome do carro:</FieldLabel>
            <Input className="w-full" type="text"
              name="name"
              register={register}
              error={errors.name?.message}
             />
          </Field>
            <div className="flex gap-3 w-full">
              <Field>
                <FieldLabel htmlFor="city">Modelo</FieldLabel>
                <Input
                className="w-full"
                type="text"
                name="model"
                register={register}
                error={errors.model?.message}
                />
              </Field>
              <Field>
              <FieldLabel htmlFor="zip">Ano</FieldLabel>
              <Input 
              className="w-full"
              type="text"
              name="year"
              register={register}
              error={errors.year?.message}
              />
            </Field>
            </div>
             <div className="flex gap-3 w-full">
              <Field>
                <FieldLabel htmlFor="city">Km</FieldLabel>
                <Input
                className="w-full"
                type="text"
                name="km"
                register={register}
                error={errors.km?.message}
                />
              </Field>
              <Field>
              <FieldLabel htmlFor="zip">Preço</FieldLabel>
              <Input 
              className="w-full"
              type="text"
              name="price"
              register={register}
              error={errors.price?.message}
              />
            </Field>
            </div>
             <div className="flex gap-3 w-full">
              <Field>
                <FieldLabel htmlFor="city">Cidade</FieldLabel>
                <Input
                className="w-full"
                type="text"
                name="city"
                register={register}
                error={errors.city?.message}
                />
              </Field>
              <Field>
              <FieldLabel htmlFor="zip">WhatsApp</FieldLabel>
              <Input 
              className="w-full"
              type="text"
              name="whatsapp"
              register={register}
              error={errors.whatsapp?.message}
              />
            </Field>
            </div>
            <div className="w-full">
              <Field>
                <FieldLabel htmlFor="city">Descrição</FieldLabel>
                <Textarea
                {...register("description")}
                 className="h-40"
                 name="description"
                 id="description"        
                />
              </Field>
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
            </div>
            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
      </div>

    </Container>
   
    </>  
  )
}

export default NewCar
export type {ImageItemProps}