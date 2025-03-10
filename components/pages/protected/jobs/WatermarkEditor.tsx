"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Settings } from "lucide-react"

interface WatermarkEditorProps {
  imageUrl: string | null
  onSave: (watermarkConfig: WatermarkConfig) => void
  initialConfig?: WatermarkConfig
}

export interface WatermarkConfig {
  text: string
  size: number
  opacity: number
  color: string
  rotation: number
  spacingX: number
  spacingY: number
  positionX: number
  positionY: number
}

const SEO_DIMENSIONS = [
  { width: 1600, height: 900 },
  { width: 1200, height: 675 },
  { width: 1200, height: 1200 },
  { width: 1200, height: 900 },
]

export default function WatermarkEditor({ imageUrl, onSave, initialConfig }: WatermarkEditorProps) {
  const [config, setConfig] = useState<WatermarkConfig>(
    initialConfig || {
      text: "© Minha Marca",
      size: 24,
      opacity: 0.7,
      color: "#ffffff",
      rotation: 0,
      spacingX: 100,
      spacingY: 100,
      positionX: 0,
      positionY: 0,
    },
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const modalCanvasRef = useRef<HTMLCanvasElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null)

  // Load image once
  useEffect(() => {
    if (!imageUrl) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl

    img.onload = () => {
      setImageObj(img)
      setImageLoaded(true)
    }
  }, [imageUrl])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !imageObj) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match image
    const { width, height } = getBestFitDimensions(imageObj.width, imageObj.height)
    canvas.width = width
    canvas.height = height

    // Draw the image
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height)

    // Apply watermark
    applyWatermark(ctx, canvas.width, canvas.height)

    updateModalCanvas()
  }, [imageObj, config])

  const updateModalCanvas = useCallback(() => {
    const canvas = modalCanvasRef.current

    if (!canvas || !imageObj) return

    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Calculate aspect ratio
    const aspectRatio = imageObj.width / imageObj.height

    // Set fixed width for preview and calculate height
    const previewWidth = 500
    const previewHeight = previewWidth / aspectRatio

    // Set canvas dimensions
    canvas.width = previewWidth
    canvas.height = previewHeight

    // Draw the image scaled to fit preview
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(imageObj, 0, 0, previewWidth, previewHeight)

    // Apply watermark with scale factor
    const scaleFactor = previewWidth / imageObj.width
    applyWatermark(ctx, previewWidth, previewHeight, scaleFactor)
  }, [imageObj, config])

  const applyWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number, scaleFactor = 1) => {
    ctx.save()

    const fontSize = config.size * scaleFactor
    ctx.font = `${fontSize}px Arial`
    ctx.fillStyle = hexToRgba(config.color, config.opacity)

    const textWidth = ctx.measureText(config.text).width
    const textHeight = fontSize

    for (let y = config.positionY * scaleFactor; y < height; y += textHeight + config.spacingY * scaleFactor) {
      for (let x = config.positionX * scaleFactor; x < width; x += textWidth + config.spacingX * scaleFactor) {
        ctx.save()
        ctx.translate(x + textWidth / 2, y + textHeight / 2)
        ctx.rotate((config.rotation * Math.PI) / 180)
        ctx.translate(-(x + textWidth / 2), -(y + textHeight / 2))
        ctx.fillText(config.text, x, y + textHeight)
        ctx.restore()
      }
    }

    ctx.restore()
  }

  const hexToRgba = (hex: string, opacity: number) => {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  const handleSave = () => {
    onSave(config)
    setIsModalOpen(false)
  }

  const updateConfig = (key: keyof WatermarkConfig, value: string | number) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const openModal = useCallback(() => {
    setIsModalOpen(true)

    setTimeout(() => {
      updateModalCanvas()
    })
  }, [updateModalCanvas])

  const getBestFitDimensions = (originalWidth: number, originalHeight: number) => {
    let bestFit = SEO_DIMENSIONS[0]
    let minDiff = Infinity

    SEO_DIMENSIONS.forEach(({ width, height }) => {
      const widthDiff = Math.abs(originalWidth - width)
      const heightDiff = Math.abs(originalHeight - height)
      const diff = widthDiff + heightDiff

      if (diff < minDiff) {
        minDiff = diff
        bestFit = { width, height }
      }
    })

    const aspectRatio = originalWidth / originalHeight
    const bestFitAspectRatio = bestFit.width / bestFit.height

    if (aspectRatio > bestFitAspectRatio) {
      return {
        width: bestFit.width,
        height: Math.round(bestFit.width / aspectRatio),
      }
    } else {
      return {
        width: Math.round(bestFit.height * aspectRatio),
        height: bestFit.height,
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="aspect-video rounded-lg overflow-hidden bg-muted flex justify-center items-center">
          <canvas 
            ref={canvasRef} 
            className="max-w-full h-auto object-contain" 
            style={{ display: isModalOpen ? "none" : "block" }}
          />
        </div>

        <div className="absolute bottom-4 right-4">
          <Button variant="secondary" size="sm" className="gap-2" onClick={openModal}>
            <Settings className="h-4 w-4" />
            Configurar Marca d&apos;água
          </Button>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-[90vw] h-[80%] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Configurar Marca d&apos;água</DialogTitle>
                <DialogDescription>Ajuste as configurações da marca d&apos;água para sua imagem.</DialogDescription>
              </DialogHeader>

              <div className="flex flex-col md:flex-row gap-6 py-4">
                <div>
                  <div className="space-y-4 w-full md:w-2/5">
                    <div className="grid gap-2">
                      <Label htmlFor="watermark-text">Texto da marca d&apos;água</Label>
                      <Input
                        id="watermark-text"
                        value={config.text}
                        onChange={(e) => updateConfig("text", e.target.value)}
                        placeholder="Digite o texto da marca d'água"
                        className="text-sm"
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <Label htmlFor="watermark-size">Tamanho</Label>
                        <span className="text-sm text-muted-foreground">{config.size}px</span>
                      </div>
                      <Slider
                        id="watermark-size"
                        min={10}
                        max={100}
                        step={1}
                        value={[config.size]}
                        onValueChange={(value) => updateConfig("size", value[0])}
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <Label htmlFor="watermark-opacity">Opacidade</Label>
                        <span className="text-sm text-muted-foreground">{Math.round(config.opacity * 100)}%</span>
                      </div>
                      <Slider
                        id="watermark-opacity"
                        min={0.1}
                        max={1}
                        step={0.05}
                        value={[config.opacity]}
                        onValueChange={(value) => updateConfig("opacity", value[0])}
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <Label htmlFor="watermark-rotation">Rotação</Label>
                        <span className="text-sm text-muted-foreground">{config.rotation}°</span>
                      </div>
                      <Slider
                        id="watermark-rotation"
                        min={-180}
                        max={180}
                        step={5}
                        value={[config.rotation]}
                        onValueChange={(value) => updateConfig("rotation", value[0])}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="watermark-color">Cor</Label>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: config.color }} />
                        <Input
                          id="watermark-color"
                          type="color"
                          value={config.color}
                          onChange={(e) => updateConfig("color", e.target.value)}
                          className="w-full h-10 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 w-full md:w-3/5">
                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <Label htmlFor="watermark-spacing-x">Espaçamento X</Label>
                        <span className="text-sm text-muted-foreground">{config.spacingX}px</span>
                      </div>
                      <Slider
                        id="watermark-spacing-x"
                        min={10}
                        max={500}
                        step={10}
                        value={[config.spacingX]}
                        onValueChange={(value) => updateConfig("spacingX", value[0])}
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <Label htmlFor="watermark-spacing-y">Espaçamento Y</Label>
                        <span className="text-sm text-muted-foreground">{config.spacingY}px</span>
                      </div>
                      <Slider
                        id="watermark-spacing-y"
                        min={10}
                        max={500}
                        step={10}
                        value={[config.spacingY]}
                        onValueChange={(value) => updateConfig("spacingY", value[0])}
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <Label htmlFor="watermark-position-x">Posição X</Label>
                        <span className="text-sm text-muted-foreground">{config.positionX}px</span>
                      </div>
                      <Slider
                        id="watermark-position-x"
                        min={-500}
                        max={500}
                        step={1}
                        value={[config.positionX]}
                        onValueChange={(value) => updateConfig("positionX", value[0])}
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <Label htmlFor="watermark-position-y">Posição Y</Label>
                        <span className="text-sm text-muted-foreground">{config.positionY}px</span>
                      </div>
                      <Slider
                        id="watermark-position-y"
                        min={-500}
                        max={500}
                        step={1}
                        value={[config.positionY]}
                        onValueChange={(value) => updateConfig("positionY", value[0])}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-3/5 rounded-lg overflow-hidden bg-muted border flex justify-center items-center">
                  <canvas ref={modalCanvasRef} className="max-w-full h-auto object-contain" />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave} disabled={!imageLoaded}>
                  Aplicar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => onSave(config)} disabled={!imageLoaded}>
          Salvar configuração
        </Button>
      </div>
    </div>
  )
}
