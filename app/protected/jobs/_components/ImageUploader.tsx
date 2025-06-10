"use client";

import { useCallback, useEffect, useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import WatermarkEditor from "@/app/protected/jobs/_components/WatermarkEditor";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ImageRegister,
  ImageRegisterPrototype,
  WatermarkConfig,
} from "@/types";

interface ImageUploaderProps {
  defaultImages?: ImageRegisterPrototype[];
}

export function ImageUploader({ defaultImages }: ImageUploaderProps) {
  const [images, setImages] = useState<ImageRegisterPrototype[]>(
    defaultImages || []
  );
  const [currentImage, setCurrentImage] =
    useState<ImageRegisterPrototype | null>(null);
  const [newCategory, setNewCategory] = useState("");

  const handleSaveWatermarkConfig = useCallback(
    (config: WatermarkConfig) => {
      if (!currentImage) return;

      setImages((prev) =>
        prev.map((img) =>
          img.id === currentImage.id
            ? { ...img, watermark_config: config }
            : img
        )
      );

      setCurrentImage((prev) =>
        prev ? { ...prev, watermark_config: config } : null
      );

      toast("Configuração de marca d'água salva com sucesso!");
    },
    [currentImage]
  );

  useEffect(() => {
    console.log(images);
  }, [images]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },

    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        id:
          "temp-" +
          new Date().getTime() +
          Math.random().toString(36).substring(2, 15),
        file,
        url: URL.createObjectURL(file),
        path: "",
        title: "",
        description: "",
        price: "",
        categories: [],
        watermark_config: null,
        visible: true,
      }));

      setImages((prev) => [...prev, ...newImages] as ImageRegisterPrototype[]);

      if (newImages.length > 0) {
        setCurrentImage(newImages[0]);
      }
    },
  });

  const handleRemoveImage = (imageToRemove: ImageRegisterPrototype) => {
    setImages((prev) => prev.filter((img) => img.id !== imageToRemove.id));

    if (currentImage && currentImage.id === imageToRemove.id) {
      const remaining = images.filter((img) => img.id !== imageToRemove.id);
      setCurrentImage(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const handleUpdateImageField = <K extends keyof ImageRegister>(
    field: K,
    value: ImageRegister[K]
  ) => {
    if (!currentImage) return;

    setImages((prev) =>
      prev.map((img) =>
        img.id === currentImage.id ? { ...img, [field]: value } : img
      )
    );

    setCurrentImage((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleAddCategory = () => {
    if (!newCategory.trim() || !currentImage) {
      return;
    }

    if (!currentImage.categories.includes(newCategory)) {
      const updatedCategories = [...currentImage.categories, newCategory];
      handleUpdateImageField("categories", updatedCategories);
    }

    setNewCategory("");
  };

  const handleRemoveCategory = (category: string) => {
    if (!currentImage) {
      return;
    }

    const updatedCategories = currentImage.categories.filter(
      (c) => c !== category
    );
    handleUpdateImageField("categories", updatedCategories);
  };

  const handleUpload = () => {
    toast("Imagens enviadas com sucesso", {
      description: `${images.length} imagens foram enviadas para o servidor.`,
    });
    setImages([]);
    setCurrentImage(null);
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-2">
        Configuração de Imagens do Trabalho
      </h1>

      <p className="text-sm text-muted-foreground">
        Aqui você pode fazer upload de imagens para o trabalho, adicionar
        informações como título, descrição, preço e categorias, além de
        configurar uma marca d&apos;água para as imagens.
      </p>

      <p className="text-sm text-muted-foreground mb-4">
        Note que a qualidade das imagens será reduzida para otimizar o
        desempenho do site.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4 relative">
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
          >
            <input {...getInputProps()} />
            <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-center text-muted-foreground">
              Arraste imagens aqui ou clique para selecionar
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">
              Imagens selecionadas ({images.length})
            </h3>

            <ScrollArea className="h-[300px] pr-3">
              <div className="grid grid-cols-3 gap-2">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${currentImage?.id === image.id ? "border-primary" : "border-transparent"}`}
                    onClick={() => setCurrentImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.title || "Preview"}
                      className="h-full w-full object-cover"
                    />

                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(image);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {images.length > 0 && (
            <Button className="w-full absolute bottom-0" onClick={handleUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Enviar {images.length} imagens
            </Button>
          )}
        </div>

        <div className="md:col-span-2">
          {currentImage ? (
            <div className="space-y-4">
              <WatermarkEditor
                image={currentImage}
                initialConfig={currentImage.watermark_config || undefined}
                onSave={handleSaveWatermarkConfig}
              />

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={currentImage.title}
                    onChange={(e) =>
                      handleUpdateImageField("title", e.target.value)
                    }
                    placeholder="Título da imagem"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={currentImage.description}
                    onChange={(e) =>
                      handleUpdateImageField("description", e.target.value)
                    }
                    placeholder="Descrição da imagem"
                    rows={3}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    value={currentImage.price}
                    onChange={(e) =>
                      handleUpdateImageField("price", e.target.value)
                    }
                    placeholder="0,00"
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Categorias</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {currentImage.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {category}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => handleRemoveCategory(category)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Nova categoria"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCategory();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddCategory}>
                      Adicionar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-12 border-2 border-dashed rounded-lg">
              <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-center">
                Selecione uma imagem para editar seus detalhes
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
