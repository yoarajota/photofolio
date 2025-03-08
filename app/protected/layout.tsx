
"use client"

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
import { signOutAction } from "@/app/actions";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <Button 
              variant="outline" 
              className="mt-auto flex items-center gap-2 justify-start" 
              onClick={signOutAction} 
            >
              <LogOut className="h-5 w-5" />
              Sair
            </Button>
          </div>
        </aside>
        <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        {children}
        </main>
      </div>
    </div>
  );
}
