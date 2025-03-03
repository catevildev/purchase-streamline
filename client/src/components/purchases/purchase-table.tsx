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
import type { Purchase, Product } from "@shared/schema";
import { PurchaseForm } from "./purchase-form";

export function PurchaseTable() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);

  const { data: purchases, isLoading: purchasesLoading } = useQuery<Purchase[]>({
    queryKey: ["/api/purchases"]
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/purchases/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/purchases"] });
      toast({
        title: "Compra excluída",
        description: "A compra foi excluída com sucesso"
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

  if (purchasesLoading) {
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
            <TableHead>Fornecedor</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Aprovador</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Preço Unit.</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases?.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell>{getProductName(purchase.productId)}</TableCell>
              <TableCell>{purchase.quantity}</TableCell>
              <TableCell>{purchase.unit}</TableCell>
              <TableCell>{purchase.supplier}</TableCell>
              <TableCell>{purchase.responsible}</TableCell>
              <TableCell>{purchase.approver}</TableCell>
              <TableCell>{new Date(purchase.date).toLocaleDateString()}</TableCell>
              <TableCell>R$ {Number(purchase.unitPrice).toFixed(2)}</TableCell>
              <TableCell>R$ {Number(purchase.totalValue).toFixed(2)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditingPurchase(purchase)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => deleteMutation.mutate(purchase.id)}
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

      <Dialog open={!!editingPurchase} onOpenChange={() => setEditingPurchase(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Compra</DialogTitle>
          </DialogHeader>
          {editingPurchase && (
            <PurchaseForm 
              purchase={editingPurchase} 
              onSuccess={() => setEditingPurchase(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
