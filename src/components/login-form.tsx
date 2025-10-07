import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { auth } from "@/services/firebaseConnection";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router"
import { useState, useEffect, useContext } from "react"
import { Spinner } from "./ui/shadcn-io/spinner";
import { AuthContext } from "./context/authContext"
import toast from "react-hot-toast"

 const schema = z.object({
    email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
    password: z.string().nonempty("O campo da palavra-passe é obrigatório")
  })

  type FormData = z.infer<typeof schema>

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {

  const navigate = useNavigate();
  const[loading, setLoading] = useState(false);
  const {signed} = useContext(AuthContext)

  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  useEffect(()=>{
    async function handleLogOut(){
      await signOut(auth)
      .then(()=>{
        console.log("Deslogou!")
      })
      }

      handleLogOut()
    }, [])

  async function onSubmit(data: FormData){
    setLoading(true)
    await signInWithEmailAndPassword(auth, data.email, data.password)
    .then(()=>{
      setLoading(false);
      toast.success("Login feito com sucesso!")
      navigate("/dashboard");
    })
    .catch((error) =>{
      setLoading(false)
      toast.error("Erro, insira as credenciais corretas e tente novamente!")
      console.log(error)
      return;
    })
  }

  console.log(signed)

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
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                type="email"
                name="email"
                error={errors.email?.message}
                register={register}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                <Label htmlFor="password">Palavra-passe</Label>
                </div>
                <Input 
                type="password"
                name="password"
                error={errors.password?.message}
                register={register}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={handleSubmit(onSubmit)} type="submit" className="w-full bg-red-600">
                  {loading === true? <Spinner color="white" variant="bars"/> : "Entrar"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Ainda não tem uma conta?{" "}
              <a href="/register" className="underline underline-offset-4">
                Cadastre-se
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
