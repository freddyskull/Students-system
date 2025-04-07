import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-2xl p-0 overflow-hidden">
        <CardContent className="grid md:grid-cols-2 p-0">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="font-bold text-2xl uppercase">Benvenido devuelta</h1>
                <p className="text-muted-foreground text-balance">
                  Inicia sesión introduciendo tu cuenta
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
                <Input id="password" type="password" required placeholder="EJ: 123456" />
              </div>
              <Button type="submit" className="mt-12 w-full uppercase">
                Iniciar sesión
              </Button>
           </div>
              {/* <div className="text-sm text-center">
                ¿Aún no tienes cuenta?{" "}
                <a href="#" className="underline underline-offset-4">
                  Crear una
                </a>
              </div> */}
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
