"use client";

import { useState } from "react";
import { BarChart, Calendar, Download, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SalesProps = {
  showDetails?: boolean;
};

export function SalesOverview({ showDetails = false }: SalesProps) {
  const [period, setPeriod] = useState("month");

  // Sample sales data
  const salesData = [
    {
      id: "1",
      date: "2023-05-15",
      customer: "João Silva",
      image: "Paisagem Montanhas",
      amount: 120.0,
      status: "completed",
    },
    {
      id: "2",
      date: "2023-05-18",
      customer: "Maria Oliveira",
      image: "Retrato Família",
      amount: 250.0,
      status: "completed",
    },
    {
      id: "3",
      date: "2023-05-20",
      customer: "Carlos Santos",
      image: "Pôr do Sol",
      amount: 85.0,
      status: "processing",
    },
    {
      id: "4",
      date: "2023-05-22",
      customer: "Ana Pereira",
      image: "Cidade Noturna",
      amount: 150.0,
      status: "completed",
    },
    {
      id: "5",
      date: "2023-05-25",
      customer: "Roberto Alves",
      image: "Natureza Viva",
      amount: 95.0,
      status: "completed",
    },
    {
      id: "6",
      date: "2023-05-28",
      customer: "Fernanda Lima",
      image: "Arquitetura Moderna",
      amount: 180.0,
      status: "processing",
    },
  ];

  return (
    <div className="space-y-4">
      {!showDetails ? (
        <div className="h-[200px] flex items-center justify-center">
          <BarChart className="h-full w-full text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta Semana</SelectItem>
                  <SelectItem value="month">Este Mês</SelectItem>
                  <SelectItem value="quarter">Este Trimestre</SelectItem>
                  <SelectItem value="year">Este Ano</SelectItem>
                  <SelectItem value="all">Todo o Período</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Buscar venda..."
                className="max-w-[300px]"
                type="search"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Imagem</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>
                        {new Date(sale.date).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell>{sale.image}</TableCell>
                      <TableCell className="text-right">
                        R$ {sale.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            sale.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {sale.status === "completed"
                            ? "Concluído"
                            : "Processando"}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
