"use client";

import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { getAllJobs } from "../actions";

type RouteType = {
  id: string;
  title: string;
  path: string;
  type: "gallery" | "page" | "contact" | "about";
  active: boolean;
  order: number;
};

function SortableItem({ id, route, handleUpdateRoute, handleRemoveRoute, jobsLength }: {
  id: string;
  route: RouteType;
  handleUpdateRoute: (id: string, field: keyof RouteType, value: string | boolean) => void;
  handleRemoveRoute: (id: string) => void;
  jobsLength: number;
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
                disabled={jobsLength <= 1}
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

export function JobsManager() {
  const router = useRouter();
  const [jobs, setJobs] = useState<RouteType[]>([]);


  useEffect(() => {
    const fetchJobs = async () => {
      const jobsData = await getAllJobs();

      setJobs(jobsData);
    };

    fetchJobs();
  }, [])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setJobs((items) => {
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
    router.replace("/protected/jobs?tab=new");
  };

  const handleRemoveRoute = (id: string) => {
    setJobs(jobs.filter((route) => route.id !== id));
  };

  const handleUpdateRoute = (id: string, field: keyof RouteType, value: string | boolean) => {
    setJobs(jobs.map((route) => (route.id === id ? { ...route, [field]: value } : route)));
  };

  const handleSaveJobs = () => {
    // Here you would implement the actual save logic
    toast("Trabalho salvo com sucesso", {
      description: `${jobs.length} trabalhos foram configuradas.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Páginas de Trabalhos</h3>
          <p className="text-sm text-muted-foreground">Lorem Impsum.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddRoute}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Trabalho
          </Button>
          <Button onClick={handleSaveJobs}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={jobs} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {jobs.map((route) => (
              <SortableItem
                key={route.id}
                id={route.id}
                route={route}
                handleUpdateRoute={handleUpdateRoute}
                handleRemoveRoute={handleRemoveRoute}
                jobsLength={jobs.length}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}