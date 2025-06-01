"use client";

import { useCallback, useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import WatermarkEditor, {
  WatermarkConfig,
} from "@/app/protected/jobs/_components/WatermarkEditor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageRegister } from "@/types";

export function ImageUploader() {
  const [images, setImages] = useState<ImageRegister[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [watermarkConfig, setWatermarkConfig] =
    useState<WatermarkConfig | null>(null);

  // const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (!file) return

  //   const reader = new FileReader()
  //   reader.onload = (event) => {
  //     setSelectedImage(event.target?.result as string)
  //   }
  //   reader.readAsDataURL(file)
  // }, [])

  const handleSaveWatermarkConfig = useCallback((config: WatermarkConfig) => {
    setWatermarkConfig(config);
    alert("Configuração de marca d'água salva com sucesso!");
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },

    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file),
        url: URL.createObjectURL(file),
        title: "",
        description: "",
        price: "",
        categories: [],
      }));

      setImages((prev) => [...prev, ...newImages]);

      if (newImages.length > 0 && !selectedImage) {
        setSelectedImage(newImages[0].id);
      }
    },
  });

  const handleRemoveImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));

    if (selectedImage === id) {
      const remaining = images.filter((img) => img.id !== id);
      setSelectedImage(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const handleUpdateImageField = (
    id: string,
    field: keyof ImageRegister,
    value: string | string[],
  ) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, [field]: value } : img)),
    );
  };

  const handleAddCategory = (id: string) => {
    if (!newCategory.trim()) return;

    const currentImage = images.find((img) => img.id === id);

    if (currentImage && !currentImage.categories.includes(newCategory)) {
      handleUpdateImageField(id, "categories", [
        ...currentImage.categories,
        newCategory,
      ]);
    }
    setNewCategory("");
  };

  const handleRemoveCategory = (id: string, category: string) => {
    const currentImage = images.find((img) => img.id === id);

    if (currentImage) {
      handleUpdateImageField(
        id,
        "categories",
        currentImage.categories.filter((c) => c !== category),
      );
    }
  };

  const handleUpload = () => {
    toast("Imagens enviadas com sucesso", {
      description: `${images.length} imagens foram enviadas para o servidor.`,
    });
    setImages([]);
    setSelectedImage(null);
  };

  const currentImage = selectedImage
    ? images.find((img) => img.id === selectedImage)
    : null;

  return (
    <>
      <h1 className="text-xl font-bold mb-6">
        Configuração de Imagens do Trabalho
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
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
                    className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === image.id ? "border-primary" : "border-transparent"}`}
                    onClick={() => setSelectedImage(image.id)}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.title || "Preview"}
                      className="h-full w-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(image.id);
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
            <Button className="w-full" onClick={handleUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Enviar {images.length} imagens
            </Button>
          )}
        </div>

        <div className="md:col-span-2">
          {currentImage ? (
            <div className="space-y-4">
              <WatermarkEditor
                image={images.find((img) => img.id === selectedImage) ?? null}
                initialConfig={watermarkConfig || undefined}
                onSave={handleSaveWatermarkConfig}
              />

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={currentImage.title}
                    onChange={(e) =>
                      handleUpdateImageField(
                        currentImage.id,
                        "title",
                        e.target.value,
                      )
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
                      handleUpdateImageField(
                        currentImage.id,
                        "description",
                        e.target.value,
                      )
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
                      handleUpdateImageField(
                        currentImage.id,
                        "price",
                        e.target.value,
                      )
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
                          onClick={() =>
                            handleRemoveCategory(currentImage.id, category)
                          }
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
                          handleAddCategory(currentImage.id);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => handleAddCategory(currentImage.id)}
                    >
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
