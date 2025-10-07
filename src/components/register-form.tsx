import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { auth } from "@/services/firebaseConnection"
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { useNavigate } from "react-router"
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./context/authContext";
import toast from "react-hot-toast";

 const schema = z.object({
    name: z.string().nonempty("O campo do nome completo é obrigatório"),
    email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
    password: z.string().min(6, "O palavra passe deve conter no minímo 6 dígitos").nonempty("O campo da palavra-passe é obrigatório")
  })

  type FormData = z.infer<typeof schema>

export function RegisterForm({className, ...props}: React.ComponentProps<"div">) {

    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);
    const {handleUpdateUser} = useContext(AuthContext)

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onChange"
    });

    useEffect(()=>{
        async function handleLogOut(){
          await signOut(auth)
          .then(()=>{
            console.log("Deslogou!")
          });
          }
          handleLogOut()
        });
    
    
    async function onSubmit(data: FormData){
       setLoading(true)
       createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async(user)=>{
        await updateProfile(user.user, {
          displayName: data.name
      });
        handleUpdateUser({
          uid: user.user.uid,
          name: data.name,
          email: data.email
          });
        setLoading(false)
        toast.success("Cadastro feito com sucesso!")
      })
      .catch((error)=>{
        setLoading(false)
        toast.error("Erro, tente novamente!")
        console.log(error)
      });
    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-red-600 text-2xl font-bold text-center">LowPrice <span className="text-black">Cars🏎</span></h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-3">
                <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Nome completo:</Label>
                </div>
                <Input
                 name="name" 
                 type="text"
                 error={errors.name?.message} 
                 register={register}
                 />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  error={errors.email?.message}
                  register={register}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Palavra-passe</Label>
                </div>
                <Input
                 name="password"
                 type="password"
                 error={errors.password?.message}
                 register={register} 
                 />
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={handleSubmit(onSubmit)} type="submit" className="w-full bg-red-600">
                  {loading === true?<Spinner color="white"/> : "Cadastrar"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Já possui uma conta?{" "}
              <a href="/login" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>

    </div>
    
  )

  
}
