import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Container } from "@/components/Container"
import { DashboardHeader } from "@/components/DashboardHeader"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

  const schema = z.object({
    carName: z.string().nonempty("O nome não pode ficar vazio"),
    model: z.string().nonempty("O modelo não pode ficar vazio"),
    year: z.string().nonempty("O ano não pode fica vazio"),
    km: z.string().nonempty("Este campo não pode ficar vazio"),
    price: z.string().nonempty("O preço não pode ficar vazio"),
    city: z.string().nonempty("A o campo da cidade não pode ficar vazio"),
    whatsapp: z.string().nonempty("Este campo não pode ficar vazio"),
    description: z.string().nonempty("A descrição não pode ficar vazia"),
  })

  type FormData = z.infer<typeof schema>;

function NewCar() {

  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  return (
    <>
  <Container>
      <DashboardHeader/>
      <div className="w-full bg-red-600 rounded-lg flex flex-col sm:flex-row items-center gap-2 h-40 mt-5">
        <button className="border-2 h-36 w-48 rounded-lg flex items-center justify-center ml-3">
          <div className="absolute cursor-pointer">
            <Upload color="white"/>
          </div>
          <div className="cursor-pointer">
            <input type="file" accept="image/*" className="opacity-0 cursor-pointer" />
          </div>
        </button>
      </div>

      <div className="w-full bg-red-300 p-3 rounded-lg flex flex-col sm:flex-row  gap-2 mt-2 h-screen">
    <div className="w-full space-y-3">
      <FieldSet>
        <FieldGroup>
          <div className="flex flex-col flex-wrap lg:flex-row gap-5 w-full">
            <Field>
            <FieldLabel htmlFor="street">Nome do carro:</FieldLabel>
            <Input className="w-full" type="text"
              name="carName"
              register={register}
              error={errors.carName?.message}
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
              <FieldLabel htmlFor="zip">Valor</FieldLabel>
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
            <Button className="w-full">
              Cadastrar
            </Button>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
      </div>

    </Container>
   
    </>  
  )
}

export default NewCar
