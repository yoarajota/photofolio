"use client";

import { ControllerRenderProps, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ChangeEvent } from "react";
import { saveJob } from "../actions";
import { useRouter } from "next/navigation";
import { Job } from "@/types";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "O título deve ter pelo menos 3 caracteres.",
  }),
  seo_description: z.string().max(160, {
    message: "A descrição SEO deve ter no máximo 160 caracteres.",
  }),
  seo_keywords: z.string(),
  slug: z
    .string()
    .min(3, {
      message: "A rota deve ter pelo menos 3 caracteres.",
    })
    .regex(/^[a-z0-9-]+$/, {
      message: "A rota deve conter apenas letras minúsculas, números e hífens.",
    }),
});

const formFields = [
  {
    name: "title",
    label: "Título da Página",
    placeholder: "Casamento João e Maria",
    description: "Este é o título principal que será exibido na página.",
    component: Input,
    onChange:
      (
        field: ControllerRenderProps<
          {
            title: string;
            seo_description: string;
            slug: string;
            seo_keywords: string;
          },
          "title" | "seo_description" | "seo_keywords" | "slug"
        >,
        form: UseFormReturn<{
          title: string;
          seo_description: string;
          slug: string;
          seo_keywords: string;
        }>,
        generateSlug: (title: string) => void,
      ) =>
      (e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>) => {
        const oldSlug = generateSlug(form.getValues("title")) ?? "";

        field.onChange(e);

        const newSlug = generateSlug(e.target.value) ?? "";
        const currentSlug: string | null = form.getValues("slug") ?? null;

        if (currentSlug === oldSlug || !currentSlug) {
          form.setValue("slug", newSlug);
        }
      },
    wrapperClassName: "col-span-full",
  },
  {
    name: "seo_description",
    label: "Descrição SEO",
    placeholder: "Uma breve descrição do trabalho para melhorar o SEO",
    description:
      "Esta descrição será usada nas meta tags para melhorar o SEO. Máximo de 160 caracteres.",
    component: Textarea,
    className: "resize-none",
    wrapperClassName: "col-span-full",
  },
  {
    name: "seo_keywords",
    label: "Palavras-chave SEO",
    placeholder: "fotografia, casamento, ensaio, etc",
    description: "Palavras-chave separadas por vírgula para melhorar o SEO.",
    component: Input,
  },
  {
    name: "slug",
    label: "Rota personalizada",
    placeholder: "casamento-joao-maria",
    description:
      "A URL personalizada para este trabalho. Use apenas letras minúsculas, números e hífens.",
    component: Input,
    prefix: "/jobs/",
  },
];

interface JobConfigProps {
  setActiveTab?: (tab: string) => void;
  data: z.infer<typeof formSchema>;
}

export default function JobConfig({
  setActiveTab,
  data = {
    title: "",
    seo_description: "",
    seo_keywords: "",
    slug: "",
  } as z.infer<typeof formSchema>,
}: JobConfigProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      seo_description: "",
      seo_keywords: "",
      slug: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await saveJob({
      title: values.title,
      seo_description: values.seo_description,
      seo_keywords: values.seo_keywords,
      slug: values.slug,
    } as Job);

    if (!error) {
      toast("Configuração salva", {
        description: "As configurações do trabalho foram salvas com sucesso.",
      });

      router.replace("/protected/jobs");

      if (setActiveTab) {
        setActiveTab("jobs");
      }
    } else {
      toast.error("Erro ao salvar configuração", {
        description: "Ocorreu um erro ao salvar as configurações do trabalho.",
      });

      console.log(error);
    }
  }

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-6">
        Configuração do Página do Trabalho
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {formFields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={
                field.name as
                  | "title"
                  | "seo_description"
                  | "seo_keywords"
                  | "slug"
              }
              render={({ field: formField }) => (
                <FormItem className={field.wrapperClassName}>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    {field.prefix ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">
                          {field.prefix}
                        </span>
                        <field.component
                          placeholder={field.placeholder}
                          {...formField}
                          className={field.className}
                        />
                      </div>
                    ) : (
                      <field.component
                        placeholder={field.placeholder}
                        {...formField}
                        className={field.className}
                        onChange={
                          field.onChange
                            ? field.onChange(formField, form, generateSlug)
                            : formField.onChange
                        }
                      />
                    )}
                  </FormControl>
                  <FormDescription>{field.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="flex justify-end space-x-4 pt-4 col-span-full">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit">Salvar configurações</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
