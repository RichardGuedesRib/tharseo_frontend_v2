import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "@/api/auth/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { AppleLogo, GoogleLogo } from "@phosphor-icons/react";

const formSchema = z.object({
  email: z.string().email("Informe um email válido."),
  password: z.string(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [step, setStep] = React.useState(1);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleNextStep() {
    const isValid = await form.trigger("email");
    if (isValid) {
      setStep(2);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      const login = await authService.signIn(data);
      useAuthStore.getState().setAuth({
        user: login.user,
        token: login.token,
        expiresIn: login.expiresIn,
      });
      toast.success("Usuário logado com sucesso!", {
        duration: 5000,
        position: "top-right",
      });
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          duration: 5000,
          position: "top-right",
        });
      } else {
        toast.error("Erro desconhecido ao efetuar login.", {
          duration: 5000,
          position: "top-right",
        });
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-2">
            <img src="/images/tharseo.png" alt="Tharseo" />
            <div className="text-center text-sm text-white ">
              Não possui uma conta? {""}
              <Link to="/signup">
                <strong>Inscreva-se</strong>
              </Link>
            </div>
          </div>
          {/* Step 1: Email */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@email.com"
                  className="text-white"
                  {...form.register("email")}
                  required
                />
              </div>
              <Button type="button" onClick={handleNextStep} className="h-10">
                Próximo
              </Button>
            </div>
          )}
          {/* Step 2: Senha */}
          {step === 2 && (
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  className="text-white"
                  {...form.register("password")}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          )}

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-zinc-200 dark:after:border-zinc-800"></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" className="w-full">
            <AppleLogo size={32} />
              Continue with Apple
            </Button>
            <Button variant="outline" className="w-full">
            <GoogleLogo size={32} />
              Continue with Google
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-zinc-500 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-zinc-900  dark:text-zinc-400 dark:hover:[&_a]:text-zinc-50">
        Ao continuar, você aceita nossos<br></br>{" "}
        <a href="#">Termos de Serviço</a> e nossa{" "}
        <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  );
}
