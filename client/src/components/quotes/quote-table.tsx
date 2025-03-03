import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Quote, Product } from "@shared/schema";
import { QuoteForm } from "./quote-form";

export function QuoteTable() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);

  const { data: quotes, isLoading: quotesLoading } = useQuery<Quote[]>({
    queryKey: ["/api/quotes"]
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/quotes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
      toast({
        title: "Cotação excluída",
        description: "A cotação foi excluída com sucesso"
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  if (quotesLoading) {
    return <div>Carregando...</div>;
  }

  const getProductName = (productId: number) => {
    return products?.find(p => p.id === productId)?.name || 'Produto não encontrado';
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Unidade</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Fornecedor 1</TableHead>
            <TableHead>Preço 1</TableHead>
            <TableHead>Fornecedor 2</TableHead>
            <TableHead>Preço 2</TableHead>
            <TableHead>Fornecedor 3</TableHead>
            <TableHead>Preço 3</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes?.map((quote) => (
            <TableRow key={quote.id}>
              <TableCell>{getProductName(quote.productId)}</TableCell>
              <TableCell>{quote.quantity}</TableCell>
              <TableCell>{quote.unit}</TableCell>
              <TableCell>{quote.responsible}</TableCell>
              <TableCell>{quote.supplier1}</TableCell>
              <TableCell>R$ {Number(quote.price1).toFixed(2)}</TableCell>
              <TableCell>{quote.supplier2}</TableCell>
              <TableCell>R$ {Number(quote.price2).toFixed(2)}</TableCell>
              <TableCell>{quote.supplier3}</TableCell>
              <TableCell>R$ {Number(quote.price3).toFixed(2)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditingQuote(quote)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => deleteMutation.mutate(quote.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!editingQuote} onOpenChange={() => setEditingQuote(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Editar Cotação</DialogTitle>
          </DialogHeader>
          {editingQuote && (
            <QuoteForm 
              quote={editingQuote} 
              onSuccess={() => setEditingQuote(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
