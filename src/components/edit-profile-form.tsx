"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { userService, UpdateUserProfile } from "@/api/user/userService";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres.").max(30, "O nome deve ter no máximo 30 caracteres."),
  lastName: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres.").max(100, "O sobrenome deve ter no máximo 100 caracteres."),
  email: z.string().email("Informe um email válido."),
  phone: z.string().regex(/^\d{11}$/, "O número de celular deve ter exatamente 11 dígitos."),
});

interface EditProfileFormProps {
  user: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onSuccess?: (updatedUser: { name: string; lastName: string; email: string; phone: string }) => void;
  onCancel?: () => void;
}

export function EditProfileForm({ user, onSuccess, onCancel }: EditProfileFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { token } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) {
      toast.error("Token de autenticação não encontrado", {
        duration: 5000,
        position: "top-right"
      });
      return;
    }

    setIsLoading(true);

    const data: UpdateUserProfile = {
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
    };

    try {
      const response = await userService.updateProfile(data, token);
      
      toast.success("Perfil atualizado com sucesso!", {
        duration: 5000,
        position: "top-right"
      });

      onSuccess?.(response.user);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          duration: 5000,
          position: "top-right"
        });
      } else {
        toast.error("Erro desconhecido ao atualizar perfil.", {
          duration: 5000,
          position: "top-right"
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
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
              <FormLabel>Sobrenome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu sobrenome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} />
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
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu telefone (11 dígitos)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </Form>
  );
}