"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Globe, Image as ImageIcon, RotateCcw } from "lucide-react";
import { ImageRegisterPrototype, WatermarkConfig } from "@/types";
import { useGlobalWatermark } from "@/utils/hooks/use-global-watermark";
interface WatermarkEditorProps {
  image: ImageRegisterPrototype | null;
  onSave: (watermarkConfig: WatermarkConfig) => void;
  initialConfig?: WatermarkConfig;
}

const SEO_DIMENSIONS = [
  { width: 1600, height: 900 },
  { width: 1200, height: 675 },
  { width: 1200, height: 1200 },
  { width: 1200, height: 900 },
];

type ModalMode = "global" | "specific" | null;

export default function WatermarkEditor({
  image,
  onSave,
  initialConfig,
}: WatermarkEditorProps) {
  console.log("WatermarkEditor rendered with image:", image, initialConfig);

  const { globalConfig, saveGlobalConfig, resetToDefault } =
    useGlobalWatermark();

  const [currentConfig, setCurrentConfig] = useState<WatermarkConfig>(
    initialConfig ?? globalConfig
  );
  const [editingConfig, setEditingConfig] =
    useState<WatermarkConfig>(globalConfig);
  const [modalMode, setModalMode] = useState<ModalMode>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modalCanvasRef = useRef<HTMLCanvasElement>(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!initialConfig) {
      setCurrentConfig(globalConfig);
    }
  }, [image]);

  useEffect(() => {
    if (!image?.url && !image?.path) {
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image.url || image.path || "";

    img.onload = () => {
      setImageObj(img);
      setImageLoaded(true);
    };

    img.onerror = () => {
      setImageLoaded(false);
    };
  }, [image]);

  useEffect(() => {
    updateMainCanvas();
  }, [imageObj, currentConfig]);

  const getBestFitDimensions = (
    originalWidth: number,
    originalHeight: number
  ) => {
    let bestFit = SEO_DIMENSIONS[0];
    let minDiff = Infinity;

    SEO_DIMENSIONS.forEach(({ width, height }) => {
      const widthDiff = Math.abs(originalWidth - width);
      const heightDiff = Math.abs(originalHeight - height);
      const diff = widthDiff + heightDiff;

      if (diff < minDiff) {
        minDiff = diff;
        bestFit = { width, height };
      }
    });

    const aspectRatio = originalWidth / originalHeight;
    const bestFitAspectRatio = bestFit.width / bestFit.height;

    if (aspectRatio > bestFitAspectRatio) {
      return {
        width: bestFit.width,
        height: Math.round(bestFit.width / aspectRatio),
      };
    } else {
      return {
        width: Math.round(bestFit.height * aspectRatio),
        height: bestFit.height,
      };
    }
  };

  const applyWatermark = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    config: WatermarkConfig,
    scaleFactor = 1
  ) => {
    ctx.save();

    const fontSize = config.size * scaleFactor;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = hexToRgba(config.color, config.opacity);

    const textWidth = ctx.measureText(config.text).width;
    const textHeight = fontSize;

    ctx.translate(width / 2, height / 2);
    ctx.rotate((config.rotation * Math.PI) / 180);
    ctx.translate(-width / 2, -height / 2);

    for (
      let y = config.positionY * scaleFactor;
      y < height;
      y += textHeight + config.spacingY * scaleFactor
    ) {
      for (
        let x = config.positionX * scaleFactor;
        x < width;
        x += textWidth + config.spacingX * scaleFactor
      ) {
        ctx.fillText(config.text, x, y + textHeight);
      }
    }

    ctx.restore();
  };

  const hexToRgba = (hex: string, opacity: number) => {
    const r = Number.parseInt(hex.slice(1, 3), 16);
    const g = Number.parseInt(hex.slice(3, 5), 16);
    const b = Number.parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const updateMainCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageObj) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const { width, height } = getBestFitDimensions(
      imageObj.width,
      imageObj.height
    );
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);

    applyWatermark(ctx, canvas.width, canvas.height, currentConfig);
  }, [imageObj, currentConfig]);

  const updateModalCanvas = useCallback(() => {
    const canvas = modalCanvasRef.current;
    if (!canvas || !imageObj) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const aspectRatio = imageObj.width / imageObj.height;

    const previewWidth = 500;
    const previewHeight = previewWidth / aspectRatio;

    canvas.width = previewWidth;
    canvas.height = previewHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageObj, 0, 0, previewWidth, previewHeight);

    const scaleFactor = previewWidth / imageObj.width;
    applyWatermark(
      ctx,
      previewWidth,
      previewHeight,
      editingConfig,
      scaleFactor
    );
  }, [imageObj, editingConfig]);

  const openGlobalModal = () => {
    setModalMode("global");
    setEditingConfig({ ...globalConfig });
    setTimeout(updateModalCanvas, 100);
  };

  const openSpecificModal = () => {
    setModalMode("specific");
    setEditingConfig({ ...currentConfig });
    setTimeout(updateModalCanvas, 100);
  };

  const closeModal = () => {
    setModalMode(null);
  };

  const applyGlobalToSpecific = () => {
    setEditingConfig({ ...globalConfig });
    setTimeout(updateModalCanvas, 50);
  };

  const handleSave = () => {
    if (modalMode === "global") {
      saveGlobalConfig({ ...editingConfig });
    } else if (modalMode === "specific") {
      setCurrentConfig({ ...editingConfig });
      onSave({ ...editingConfig });
    }

    closeModal();
  };

  const handleResetToDefault = () => {
    if (modalMode === "global") {
      const defaultConfig = resetToDefault();
      setEditingConfig({ ...defaultConfig });
      setTimeout(updateModalCanvas, 50);
    }
  };

  const updateEditingConfig = (
    key: keyof WatermarkConfig,
    value: string | number
  ) => {
    setEditingConfig((prev) => ({ ...prev, [key]: value }));
    setTimeout(updateModalCanvas, 50);
  };

  const getModalTitle = () => {
    return modalMode === "global"
      ? "Configurar Marca d'água Global"
      : "Configurar Marca d'água da Imagem";
  };

  const getModalDescription = () => {
    return modalMode === "global"
      ? "Configure o padrão de marca d'água que será usado como base para todas as imagens."
      : "Configure a marca d'água específica para esta imagem. Você pode aplicar as configurações globais como ponto de partida.";
  };

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        className="gap-2"
        onClick={openGlobalModal}
      >
        <Globe className="h-4 w-4" />
        Configurar Marca d&apos;água Global
      </Button>

      <div className="space-y-4">
        <div className="relative">
          {!modalMode && (
            <div className="aspect-video rounded-lg overflow-hidden bg-muted flex justify-center items-center">
              {imageLoaded ? (
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto object-contain"
                />
              ) : (
                <div className="text-muted-foreground">
                  Carregando imagem...
                </div>
              )}
            </div>
          )}

          <Button
            variant="secondary"
            size="sm"
            className="gap-2 absolute bottom-4 right-4"
            onClick={openSpecificModal}
            disabled={!imageLoaded}
          >
            <ImageIcon className="h-4 w-4" />
            Configurar Marca d&apos;água
          </Button>
        </div>
      </div>

      <Dialog
        open={modalMode !== null}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-[90vw] h-[80%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {modalMode === "global" ? (
                <Globe className="h-5 w-5" />
              ) : (
                <ImageIcon className="h-5 w-5" />
              )}
              {getModalTitle()}
            </DialogTitle>
            <DialogDescription>{getModalDescription()}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col md:flex-row gap-6 py-4">
            <div className="md:w-2/5 flex flex-col sm:flex-row gap-6">
              <div className="space-y-4 w-full">
                <div className="grid gap-2">
                  <Label htmlFor="watermark-text">
                    Texto da marca d&apos;água
                  </Label>
                  <Input
                    id="watermark-text"
                    value={editingConfig.text}
                    onChange={(e) =>
                      updateEditingConfig("text", e.target.value)
                    }
                    placeholder="Digite o texto da marca d'água"
                    className="text-sm"
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="watermark-size">Tamanho</Label>
                    <span className="text-sm text-muted-foreground">
                      {editingConfig.size}px
                    </span>
                  </div>
                  <Slider
                    id="watermark-size"
                    min={10}
                    max={100}
                    step={1}
                    value={[editingConfig.size]}
                    onValueChange={(value) =>
                      updateEditingConfig("size", value[0])
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="watermark-opacity">Opacidade</Label>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(editingConfig.opacity * 100)}%
                    </span>
                  </div>
                  <Slider
                    id="watermark-opacity"
                    min={0.1}
                    max={1}
                    step={0.05}
                    value={[editingConfig.opacity]}
                    onValueChange={(value) =>
                      updateEditingConfig("opacity", value[0])
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="watermark-rotation">Rotação</Label>
                    <span className="text-sm text-muted-foreground">
                      {editingConfig.rotation}°
                    </span>
                  </div>
                  <Slider
                    id="watermark-rotation"
                    min={-180}
                    max={180}
                    step={5}
                    value={[editingConfig.rotation]}
                    onValueChange={(value) =>
                      updateEditingConfig("rotation", value[0])
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="watermark-color">Cor</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-md border"
                      style={{ backgroundColor: editingConfig.color }}
                    />
                    <Input
                      id="watermark-color"
                      type="color"
                      value={editingConfig.color}
                      onChange={(e) =>
                        updateEditingConfig("color", e.target.value)
                      }
                      className="w-full h-10 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 w-full">
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="watermark-spacing-x">Espaçamento X</Label>
                    <span className="text-sm text-muted-foreground">
                      {editingConfig.spacingX}px
                    </span>
                  </div>
                  <Slider
                    id="watermark-spacing-x"
                    min={0}
                    max={500}
                    step={10}
                    value={[editingConfig.spacingX]}
                    onValueChange={(value) =>
                      updateEditingConfig("spacingX", value[0])
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="watermark-spacing-y">Espaçamento Y</Label>
                    <span className="text-sm text-muted-foreground">
                      {editingConfig.spacingY}px
                    </span>
                  </div>
                  <Slider
                    id="watermark-spacing-y"
                    min={0}
                    max={500}
                    step={10}
                    value={[editingConfig.spacingY]}
                    onValueChange={(value) =>
                      updateEditingConfig("spacingY", value[0])
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="watermark-position-x">Posição X</Label>
                    <span className="text-sm text-muted-foreground">
                      {editingConfig.positionX}px
                    </span>
                  </div>
                  <Slider
                    id="watermark-position-x"
                    min={-500}
                    max={500}
                    step={1}
                    value={[editingConfig.positionX]}
                    onValueChange={(value) =>
                      updateEditingConfig("positionX", value[0])
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="watermark-position-y">Posição Y</Label>
                    <span className="text-sm text-muted-foreground">
                      {editingConfig.positionY}px
                    </span>
                  </div>
                  <Slider
                    id="watermark-position-y"
                    min={-500}
                    max={500}
                    step={1}
                    value={[editingConfig.positionY]}
                    onValueChange={(value) =>
                      updateEditingConfig("positionY", value[0])
                    }
                  />
                </div>

                <div className="flex gap-2">
                  {modalMode === "specific" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={applyGlobalToSpecific}
                      className="w-full gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      Aplicar Configurações Globais
                    </Button>
                  )}

                  {modalMode === "global" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResetToDefault}
                      className="w-full gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Restaurar Padrão
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/5 rounded-lg overflow-hidden bg-muted border flex justify-center items-center">
              {imageLoaded ? (
                <canvas
                  ref={modalCanvasRef}
                  className="max-w-full h-auto object-contain"
                />
              ) : (
                <div className="text-muted-foreground">
                  Imagem não disponível para preview
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={!imageLoaded && modalMode === "specific"}
            >
              {modalMode === "global" ? "Salvar Global" : "Aplicar à Imagem"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
