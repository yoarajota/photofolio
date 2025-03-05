"use client"

import { useState } from "react"
import { ImageIcon, LayoutDashboard, LogOut, Menu, Package, Settings, ShoppingCart, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUploader } from "@/components/pages/protected/ImageUploader"
import { RouteManager } from "@/components/pages/protected/RouteManager"
import { SalesOverview } from "@/components/pages/protected/SalesOverview"
import { SettingsForm } from "@/components/pages/protected/SettingsForm"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
      active: pathname === "/dashboard",
    },
    {
      label: "Imagens",
      icon: ImageIcon,
      href: "/dashboard/images",
      color: "text-pink-500",
      active: pathname === "/dashboard/images",
    },
    {
      label: "Rotas",
      icon: Package,
      href: "/dashboard/routes",
      color: "text-violet-500",
      active: pathname === "/dashboard/routes",
    },
    {
      label: "Vendas",
      icon: ShoppingCart,
      href: "/dashboard/sales",
      color: "text-orange-500",
      active: pathname === "/dashboard/sales",
    },
    {
      label: "Usuários",
      icon: Users,
      href: "/dashboard/users",
      color: "text-green-500",
      active: pathname === "/dashboard/users",
    },
    {
      label: "Configurações",
      icon: Settings,
      href: "/dashboard/settings",
      color: "text-gray-500",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <nav className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 py-4">
                <ImageIcon className="h-6 w-6" />
                <span className="text-lg font-semibold">Portfólio Admin</span>
              </div>
              <nav className="flex flex-col gap-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted ${
                      route.active ? "bg-muted" : ""
                    }`}
                  >
                    <route.icon className={`h-5 w-5 ${route.color}`} />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <ImageIcon className="h-6 w-6" />
          <span className="text-lg font-semibold hidden md:flex">Portfólio Admin</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Input type="search" placeholder="Buscar..." className="md:w-64 lg:w-80 hidden md:flex" />
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
            <AvatarFallback>FP</AvatarFallback>
          </Avatar>
        </div>
      </nav>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-background md:flex md:flex-col">
          <div className="flex flex-col gap-2 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted ${
                  route.active ? "bg-muted" : ""
                }`}
              >
                <route.icon className={`h-5 w-5 ${route.color}`} />
                {route.label}
              </Link>
            ))}
            <Button variant="outline" className="mt-auto flex items-center gap-2 justify-start">
              <LogOut className="h-5 w-5" />
              Sair
            </Button>
          </div>
        </aside>
        <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Gerencie seu portfólio, imagens e vendas em um só lugar.</p>
          </div>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="images">Imagens</TabsTrigger>
              <TabsTrigger value="routes">Rotas</TabsTrigger>
              <TabsTrigger value="sales">Vendas</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 4.532,89</div>
                    <p className="text-xs text-muted-foreground">+20.1% em relação ao mês passado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Imagens Vendidas</CardTitle>
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+48</div>
                    <p className="text-xs text-muted-foreground">+12% em relação ao mês passado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Visitantes</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">+18.2% em relação ao mês passado</p>
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
                    <CardDescription>Você adicionou 12 imagens este mês.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="aspect-square rounded-md bg-muted overflow-hidden">
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
            <TabsContent value="images" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload de Imagens</CardTitle>
                  <CardDescription>Adicione novas imagens ao seu portfólio.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUploader />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="routes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Rotas</CardTitle>
                  <CardDescription>Configure as páginas e rotas do seu portfólio.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RouteManager />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sales" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Vendas</CardTitle>
                  <CardDescription>Visualize e gerencie suas vendas.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesOverview showDetails={true} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                  <CardDescription>Gerencie as configurações do seu portfólio.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SettingsForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

