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

  const form = useForm<InsertQuote>({
    resolver: zodResolver(insertQuoteSchema),
    defaultValues: quote || {
      productId: 0,
      quantity: "0",
      unit: "",
      responsible: "",
      supplier1: "",
      price1: "0",
      date1: new Date().toISOString(),
      supplier2: "",
      price2: "0",
      date2: new Date().toISOString(),
      supplier3: "",
      price3: "0",
      date3: new Date().toISOString()
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertQuote) => {
      const res = await apiRequest(
        quote ? "PATCH" : "POST",
        quote ? `/api/quotes/${quote.id}` : "/api/quotes",
        data
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
              <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value.toString()}>
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
                <Input type="number" step="0.01" {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                    <Input {...field} />
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
                    <Input type="number" step="0.01" {...field} />
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
                    <Input type="date" {...field} value={field.value?.split('T')[0]} />
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
                    <Input {...field} />
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
                    <Input type="number" step="0.01" {...field} />
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
                    <Input type="date" {...field} value={field.value?.split('T')[0]} />
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
                    <Input {...field} />
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
                    <Input type="number" step="0.01" {...field} />
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
                    <Input type="date" {...field} value={field.value?.split('T')[0]} />
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
