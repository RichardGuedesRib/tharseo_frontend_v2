"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { authService } from "@/api/auth/authService";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    email: z.string().email("Informe um email válido."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirm_password: z.string().min(6, "Confirme a senha."),
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
    lastName: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres."),
    phone: z
      .string()
      .regex(/^\d{10,11}$/, "O número de celular deve ter 10 ou 11 dígitos."),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem.",
    path: ["confirm_password"],
  });

export function RegisterForm() {
  const [step, setStep] = React.useState(1);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      name: "",
      lastName: "",
      phone: "",
    },
  });

  async function handleNextStep() {
    const fieldsToValidate: Array<keyof z.infer<typeof formSchema>> =
      step === 1
        ? ["email", "password", "confirm_password"]
        : ["name", "lastName", "phone"];
  
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep((prevStep) => prevStep + 1);
    }
  }
 async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const data = {
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      phone: values.phone,
      levelUser: "user",
      credentialId: null,
      walletId: null,
      balance: 0,
      isActive: true
    }

    try {
      await authService.registerUser(data);
  
      toast.success("Usuário Cadastrado com sucesso!",{
        duration: 5000,
        position: "top-right"
      });

      form.reset();
      setTimeout(() => {
        navigate("/signin"); 
      }, 1000);
      
      
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message,{
          duration: 5000,
          position: "top-right"
        });
      } else {
        toast.error("Erro desconhecido ao registrar usuário.",{
          duration: 5000,
          position: "top-right"
        });
      }
    }
   
  }
  

  return (
    <div className="flex flex-col gap-6 justify-center align-center">
      <img src="/images/tharseo.png" alt="Tharseo" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <>
              <FormDescription>Informações de Acesso:</FormDescription>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu melhor email" {...field} className="text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Digite sua senha" {...field} className="text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Confirme a Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirme sua senha" {...field} className="text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 2 && (
            <>
              <FormDescription>Sobre Você:</FormDescription>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} className="text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} className="text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Celular</FormLabel>
                    <FormControl>
                      <Input placeholder="Informe seu número de celular" {...field} className="text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step !== 2 ? (
            <Button type="button" onClick={handleNextStep} variant="default">
              Próximo
            </Button>
          ) : (
            <Button type="submit" variant="default">
              Salvar
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
