import { verifyOTPToken } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

export default async function Login(props: {
  searchParams: Promise<{
    email: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <form className="flex-1 flex flex-col min-w-64 mx-auto">
      <h1 className="text-2xl font-medium">Insira o código de acesso:</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Input name="email" type="hidden" required value={searchParams.email} />

        <InputOTP
          maxLength={6}
          containerClassName="justify-center"
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

        <SubmitButton pendingText="Entrando..." formAction={verifyOTPToken}>
          Entrar
        </SubmitButton>

        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
