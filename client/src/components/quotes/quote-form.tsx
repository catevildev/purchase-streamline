import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertQuoteSchema } from "@shared/schema";
import type { InsertQuote, Quote, Product } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface QuoteFormProps {
  quote?: Quote;
  onSuccess?: () => void;
}

export function QuoteForm({ quote, onSuccess }: QuoteFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "";
    return new Date(date).toISOString().split('T')[0];
  };

  const form = useForm<InsertQuote>({
    resolver: zodResolver(insertQuoteSchema),
    defaultValues: quote ? {
      productId: quote.productId,
      quantity: quote.quantity.toString(),
      unit: quote.unit,
      responsible: quote.responsible,
      supplier1: quote.supplier1 ?? "",
      price1: quote.price1?.toString() ?? "0",
      date1: formatDate(quote.date1),
      supplier2: quote.supplier2 ?? "",
      price2: quote.price2?.toString() ?? "0",
      date2: formatDate(quote.date2),
      supplier3: quote.supplier3 ?? "",
      price3: quote.price3?.toString() ?? "0",
      date3: formatDate(quote.date3)
    } : {
      productId: 0,
      quantity: "0",
      unit: "",
      responsible: "",
      supplier1: "",
      price1: "0",
      date1: new Date().toISOString().split('T')[0],
      supplier2: "",
      price2: "0",
      date2: new Date().toISOString().split('T')[0],
      supplier3: "",
      price3: "0",
      date3: new Date().toISOString().split('T')[0]
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertQuote) => {
      const res = await apiRequest(
        quote ? "PATCH" : "POST",
        quote ? `/api/quotes/${quote.id}` : "/api/quotes",
        {
          ...data,
          date1: data.date1 ? new Date(data.date1).toISOString() : null,
          date2: data.date2 ? new Date(data.date2).toISOString() : null,
          date3: data.date3 ? new Date(data.date3).toISOString() : null
        }
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
      toast({
        title: quote ? "Cotação atualizada" : "Cotação cadastrada",
        description: quote ? "A cotação foi atualizada com sucesso" : "A cotação foi cadastrada com sucesso"
      });
      form.reset();
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produto</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(Number(value))} 
                value={field.value?.toString() ?? "0"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {products?.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01" 
                  {...field} 
                  value={field.value ?? "0"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unidade</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsible"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsável</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          {/* Fornecedor 1 */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="supplier1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fornecedor 1</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço 1</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      {...field} 
                      value={field.value ?? "0"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data 1</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field} 
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Fornecedor 2 */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="supplier2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fornecedor 2</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço 2</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      {...field} 
                      value={field.value ?? "0"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data 2</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field} 
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Fornecedor 3 */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="supplier3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fornecedor 3</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço 3</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      {...field} 
                      value={field.value ?? "0"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data 3</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field} 
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {quote ? "Atualizar" : "Cadastrar"}
        </Button>
      </form>
    </Form>
  );
}