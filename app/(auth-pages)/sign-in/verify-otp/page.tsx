import { verifyOTPToken } from "@/app/actions";
import { FormMessage, type Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { KeyRound } from "lucide-react";

export default async function VerifyOTP(props: {
  searchParams: Promise<
    Message & {
      email: string;
    }
  >;
}) {
  const searchParams = await props.searchParams;
  const email = searchParams.email || "";

  return (
    <div className="flex items-center justify-center min-h-screen p-4 mx-auto">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="p-1 rounded-full">
              <KeyRound className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Verificação
          </CardTitle>
          <CardDescription className="text-center">
            Insira o código de 6 dígitos enviado para {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <Input name="email" type="hidden" required value={email} />

            <div className="space-y-2">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  containerClassName="justify-center gap-2"
                  name="token"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <SubmitButton
              pendingText="Verificando..."
              formAction={verifyOTPToken}
              className="w-full"
            >
              Verificar código
            </SubmitButton>

            <FormMessage message={searchParams as Message} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
