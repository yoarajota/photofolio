"use client"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export function SettingsForm() {
  const [activeTab, setActiveTab] = useState("general")

  const handleSaveSettings = () => {
    toast("Configurações salvas", {
      description: "Suas configurações foram atualizadas com sucesso.",
    })
  }

  return (
    <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-3 w-full md:w-auto">
        <TabsTrigger value="general">Geral</TabsTrigger>
        <TabsTrigger value="payment">Pagamentos</TabsTrigger>
        <TabsTrigger value="notifications">Notificações</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Portfólio</CardTitle>
            <CardDescription>Configure as informações básicas do seu portfólio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="portfolio-name">Nome do Portfólio</Label>
              <Input id="portfolio-name" defaultValue="Fotografia Profissional" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="portfolio-description">Descrição</Label>
              <Textarea
                id="portfolio-description"
                defaultValue="Portfólio de fotografia profissional especializado em retratos, paisagens e eventos."
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact-email">Email de Contato</Label>
              <Input id="contact-email" type="email" defaultValue="contato@fotografiaprofissional.com" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact-phone">Telefone de Contato</Label>
              <Input id="contact-phone" type="tel" defaultValue="(11) 99999-9999" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações de SEO</CardTitle>
            <CardDescription>Otimize seu portfólio para mecanismos de busca.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="meta-title">Título da Página (Meta Title)</Label>
              <Input id="meta-title" defaultValue="Fotografia Profissional | Portfólio" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="meta-description">Descrição da Página (Meta Description)</Label>
              <Textarea
                id="meta-description"
                defaultValue="Portfólio de fotografia profissional com foco em retratos, paisagens e eventos. Confira nossos trabalhos e entre em contato."
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="keywords">Palavras-chave</Label>
              <Input id="keywords" defaultValue="fotografia, portfólio, retratos, paisagens, eventos" />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Configurações
        </Button>
      </TabsContent>

      <TabsContent value="payment" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Métodos de Pagamento</CardTitle>
            <CardDescription>Configure os métodos de pagamento aceitos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="payment-credit-card" defaultChecked />
              <Label htmlFor="payment-credit-card">Cartão de Crédito</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="payment-pix" defaultChecked />
              <Label htmlFor="payment-pix">PIX</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="payment-bank-transfer" />
              <Label htmlFor="payment-bank-transfer">Transferência Bancária</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="payment-paypal" />
              <Label htmlFor="payment-paypal">PayPal</Label>
            </div>

            <div className="grid gap-2 mt-4">
              <Label htmlFor="payment-gateway">Gateway de Pagamento</Label>
              <Select defaultValue="stripe">
                <SelectTrigger id="payment-gateway">
                  <SelectValue placeholder="Selecione o gateway" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="mercadopago">Mercado Pago</SelectItem>
                  <SelectItem value="pagseguro">PagSeguro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações de Preço</CardTitle>
            <CardDescription>Configure as opções de preço para suas imagens.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="currency">Moeda</Label>
              <Select defaultValue="brl">
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Selecione a moeda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brl">Real Brasileiro (R$)</SelectItem>
                  <SelectItem value="usd">Dólar Americano ($)</SelectItem>
                  <SelectItem value="eur">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="default-price">Preço Padrão</Label>
              <Input id="default-price" type="number" defaultValue="100" min="0" step="0.01" />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="enable-discounts" defaultChecked />
              <Label htmlFor="enable-discounts">Habilitar Descontos</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="enable-coupons" defaultChecked />
              <Label htmlFor="enable-coupons">Habilitar Cupons</Label>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Configurações
        </Button>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notificações por Email</CardTitle>
            <CardDescription>Configure as notificações por email.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="notify-new-order" defaultChecked />
              <Label htmlFor="notify-new-order">Novo Pedido</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="notify-payment-confirmed" defaultChecked />
              <Label htmlFor="notify-payment-confirmed">Pagamento Confirmado</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="notify-order-shipped" defaultChecked />
              <Label htmlFor="notify-order-shipped">Pedido Enviado</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="notify-contact-form" defaultChecked />
              <Label htmlFor="notify-contact-form">Formulário de Contato</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificações para Clientes</CardTitle>
            <CardDescription>Configure as notificações enviadas aos clientes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="customer-order-confirmation" defaultChecked />
              <Label htmlFor="customer-order-confirmation">Confirmação de Pedido</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="customer-payment-confirmation" defaultChecked />
              <Label htmlFor="customer-payment-confirmation">Confirmação de Pagamento</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="customer-shipping-confirmation" defaultChecked />
              <Label htmlFor="customer-shipping-confirmation">Confirmação de Envio</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="customer-marketing" />
              <Label htmlFor="customer-marketing">Marketing e Promoções</Label>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Configurações
        </Button>
      </TabsContent>
    </Tabs>
  )
}

