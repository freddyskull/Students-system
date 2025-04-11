import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { loginApi } from "@/api/apiRequest"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [cedula, setCedula] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    loginApi(cedula, password)
      .then((response) => {
        toast.success("Inicio de sesión exitoso", {
          description: `Bienvenido de nuevo "${response.user.userName}" `,
        })
        sessionStorage.setItem("auth", JSON.stringify(response.user));
        navigate("/home")
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          description: "Por favor, verifica tu cédula y contraseña.",
        })
      })
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-2xl p-0 overflow-hidden">
        <CardContent className="grid md:grid-cols-2 p-0">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="font-bold text-2xl uppercase">Iniciar Sesión</h1>
                <p className="text-muted-foreground text-balance">
                  Hola, introduciendo tu cédula y contraseña
                </p>
              </div>
              <div>
                <div className="gap-3 grid mt-4">
                  <Label htmlFor="cedula">Cédula</Label>
                  <Input
                    id="cedula"
                    type="number"
                    placeholder="Ej: 22602761"
                    required
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                  />
                </div>
                <div className="gap-3 grid mt-6">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm hover:underline underline-offset-2"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="EJ: 123456"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="mt-12 w-full uppercase">
                  Iniciar sesión
                </Button>
              </div>
            </div>
          </form>
          <div className="hidden md:block relative bg-muted">
            <img
              src="/login-img-3.png"
              alt="Image"
              className="absolute w-full h-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
