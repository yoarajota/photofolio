import { sendOTPCode } from "@/app/actions"
import { FormMessage, type Message } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AtSign } from "lucide-react"

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams

  return (
    <div className="flex items-center justify-center min-h-screen p-4 mx-auto">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
          <CardDescription className="text-center">Digite seu email para receber um código de acesso</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <AtSign className="h-4 w-4" />
                </div>
                <Input id="email" name="email" type="email" placeholder="you@example.com" className="pl-10" required />
              </div>
            </div>

            <SubmitButton pendingText="Entrando..." formAction={sendOTPCode} className="w-full">
              Entrar
            </SubmitButton>

            <FormMessage message={searchParams} />
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">Enviaremos um código de acesso para o seu email</p>
        </CardFooter>
      </Card>
    </div>
  )
}

