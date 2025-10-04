import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/Container";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

 const schema = z.object({
    search: z.string().nonempty("Preencha o campo"),
  })

  type FormData = z.infer<typeof schema>

function Home() {
  
      const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
      });

  return (
    <>
    <Container>
      <section className="pt-3 w-full max-w-3xl mx-auto flex justify-center items-center">
        <Input
            className="bg-white w-3xl rounded-r-none"
            placeholder="Pesquise por carros:"
            name="search"
            error={errors.search?.message}
            register={register}
            />
        <Button className="rounded-l-none bg-red-600">
        <Search/>
                </Button>
      </section> 
        <h1 className="text-center mt-10">Carros novos e usados</h1>
        <main className="grid gird-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5">
        <section className="w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2023/202305/20230513/bmw-320i-2.0-16v-turbo-flex-m-sport-automatico-wmimagem08152110825.jpg?s=fill&w=552&h=414&q=60"
            alt="Carro" 
          />
          <p className="font-bold mt-1 mb-2 px-2">BMW 320i</p>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano 2016/2016 | 23.000 km</span>
            <strong className="text-black font-medium text-xl">R$ 190.000</strong>
          </div>
          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div className="px-2 pb-2">
            <span className="text-black">
              Campo Grande - MS
            </span>
          </div>
        </section>
        
      </main>
    </Container>
    </>  
  )
}

export default Home