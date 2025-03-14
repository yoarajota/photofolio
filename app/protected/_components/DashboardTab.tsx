"use client";

import { useCallback, useEffect, useState } from "react";
import { ImageIcon, ShoppingCart, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobsManager } from "@/app/protected/_components/JobsManager";
import { SalesOverview } from "@/app/protected/_components/SalesOverview";
import { SettingsForm } from "@/app/protected/_components/SettingsForm";
import { useSearchParams, useRouter } from "next/navigation";

export default function DashboardTab({ tab }: { tab?: string }) {
  const [activeTab, setActiveTab] = useState<string>(tab ?? "overview");
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get("tab")) {
      setActiveTab(searchParams.get("tab") ?? "overview")
    }
  }, [searchParams])

  const changeTab = useCallback((tab: string) => {
    setActiveTab(tab)
    router.push("/protected")
  }, [setActiveTab]);

  return (
    <Tabs
      defaultValue="overview"
      value={activeTab}
      onValueChange={changeTab}
      className="space-y-4"
    >
      <TabsList>
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="jobs">Trabalhos</TabsTrigger>
        <TabsTrigger value="settings">Configurações</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Vendas
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 4.532,89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% em relação ao mês passado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Imagens Vendidas
              </CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+48</div>
              <p className="text-xs text-muted-foreground">
                +12% em relação ao mês passado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +18.2% em relação ao mês passado
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Visão Geral de Vendas</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <SalesOverview />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Imagens Recentes</CardTitle>
              <CardDescription>
                Você adicionou 12 imagens este mês.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md bg-muted overflow-hidden"
                  >
                    <img
                      src={`/placeholder.svg?height=100&width=100&text=Imagem ${i + 1}`}
                      alt={`Imagem ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="jobs" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Trabalhos Feitos</CardTitle>
            <CardDescription>
              Configure as páginas dos trabalhos que você fez.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JobsManager />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
            <CardDescription>
              Gerencie as configurações do seu portfólio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingsForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
