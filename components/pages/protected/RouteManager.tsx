"use client";

import { useState } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Eye, GripVertical, Plus, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type RouteType = {
  id: string;
  title: string;
  path: string;
  type: "gallery" | "page" | "contact" | "about";
  active: boolean;
  order: number;
};

function SortableItem({ id, route, handleUpdateRoute, handleRemoveRoute, routesLength }: {
  id: string;
  route: RouteType;
  handleUpdateRoute: (id: string, field: keyof RouteType, value: string | boolean) => void;
  handleRemoveRoute: (id: string) => void;
  routesLength: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} className="border">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div {...listeners} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1 items-center">
            <div className="space-y-1">
              <Label htmlFor={`title-${route.id}`} className="text-xs">
                Título
              </Label>
              <Input
                id={`title-${route.id}`}
                value={route.title}
                onChange={(e) => handleUpdateRoute(route.id, "title", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor={`path-${route.id}`} className="text-xs">
                Caminho
              </Label>
              <Input
                id={`path-${route.id}`}
                value={route.path}
                onChange={(e) => handleUpdateRoute(route.id, "path", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor={`type-${route.id}`} className="text-xs">
                Tipo
              </Label>
              <Select
                value={route.type}
                onValueChange={(value) => handleUpdateRoute(route.id, "type", value)}
              >
                <SelectTrigger id={`type-${route.id}`}>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gallery">Galeria</SelectItem>
                  <SelectItem value="page">Página</SelectItem>
                  <SelectItem value="about">Sobre</SelectItem>
                  <SelectItem value="contact">Contato</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id={`active-${route.id}`}
                checked={route.active}
                onCheckedChange={(checked) => handleUpdateRoute(route.id, "active", checked)}
              />
              <Label htmlFor={`active-${route.id}`}>Ativo</Label>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="icon" asChild>
                <a href={route.path} target="_blank" rel="noopener noreferrer">
                  <Eye className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveRoute(route.id)}
                disabled={routesLength <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RouteManager() {
  const [routes, setRoutes] = useState<RouteType[]>([
    { id: "1", title: "Início", path: "/", type: "gallery", active: true, order: 0 },
    { id: "2", title: "Retratos", path: "/retratos", type: "gallery", active: true, order: 1 },
    { id: "3", title: "Paisagens", path: "/paisagens", type: "gallery", active: true, order: 2 },
    { id: "4", title: "Sobre", path: "/sobre", type: "about", active: true, order: 3 },
    { id: "5", title: "Contato", path: "/contato", type: "contact", active: true, order: 4 },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setRoutes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const updatedItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
          ...item,
          order: index,
        }));

        return updatedItems;
      });
    }
  };

  const handleAddRoute = () => {
    const newRoute: RouteType = {
      id: Math.random().toString(36).substring(2, 9),
      title: "Nova Página",
      path: `/nova-pagina-${routes.length + 1}`,
      type: "page",
      active: true,
      order: routes.length,
    };
    setRoutes([...routes, newRoute]);
  };

  const handleRemoveRoute = (id: string) => {
    setRoutes(routes.filter((route) => route.id !== id));
  };

  const handleUpdateRoute = (id: string, field: keyof RouteType, value: any) => {
    setRoutes(routes.map((route) => (route.id === id ? { ...route, [field]: value } : route)));
  };

  const handleSaveRoutes = () => {
    // Here you would implement the actual save logic
    toast("Rotas salvas com sucesso", {
      description: `${routes.length} rotas foram configuradas.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Páginas e Rotas</h3>
          <p className="text-sm text-muted-foreground">Arraste para reordenar as páginas no menu de navegação.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddRoute}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Página
          </Button>
          <Button onClick={handleSaveRoutes}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={routes} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {routes.map((route) => (
              <SortableItem
                key={route.id}
                id={route.id}
                route={route}
                handleUpdateRoute={handleUpdateRoute}
                handleRemoveRoute={handleRemoveRoute}
                routesLength={routes.length}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}