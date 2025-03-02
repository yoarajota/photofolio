import { verifyOTPToken } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64 mx-auto">
      <h1 className="text-2xl font-medium">Insira o código de acesso</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <SubmitButton pendingText="Signing In..." formAction={verifyOTPToken}>
          Sign in
        </SubmitButton>

        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
