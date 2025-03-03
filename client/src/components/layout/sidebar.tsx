import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Users,
  UserCircle,
  Package,
  FileText,
  ShoppingCart,
  LayoutDashboard,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Fornecedores", href: "/suppliers" },
  { icon: UserCircle, label: "Funcionários", href: "/employees" },
  { icon: Package, label: "Produtos", href: "/products" },
  { icon: FileText, label: "Cotações", href: "/quotes" },
  { icon: ShoppingCart, label: "Compras", href: "/purchases" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">Gestão de Compras</h1>
      </div>
      <nav className="flex-1 p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md mb-1 transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
