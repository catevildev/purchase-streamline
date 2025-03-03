import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Purchase } from "@shared/schema";

export default function Dashboard() {
  const { data: purchases } = useQuery<Purchase[]>({ 
    queryKey: ["/api/purchases"]
  });

  const purchasesByMonth = purchases?.reduce((acc, purchase) => {
    const month = new Date(purchase.date).toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + Number(purchase.totalValue);
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(purchasesByMonth || {}).map(([month, value]) => ({
    month,
    value
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total de Compras</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {purchases?.length || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              R$ {purchases?.reduce((sum, p) => sum + Number(p.totalValue), 0).toFixed(2) || "0.00"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Média por Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              R$ {(purchases?.reduce((sum, p) => sum + Number(p.totalValue), 0) || 0 / (purchases?.length || 1)).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compras por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
