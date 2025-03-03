import { pgTable, text, serial, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
});

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  department: text("department").notNull(),
  approver: integer("approver_level").default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  unit: text("unit").notNull(),
  supplier: text("supplier"),
});

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  quantity: decimal("quantity").notNull(),
  unit: text("unit").notNull(),
  responsible: text("responsible").notNull(),
  supplier1: text("supplier_1"),
  price1: decimal("price_1"),
  date1: timestamp("date_1"),
  supplier2: text("supplier_2"),
  price2: decimal("price_2"),
  date2: timestamp("date_2"),
  supplier3: text("supplier_3"),
  price3: decimal("price_3"),
  date3: timestamp("date_3"),
});

export const purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  quantity: decimal("quantity").notNull(),
  unit: text("unit").notNull(),
  supplier: text("supplier").notNull(),
  responsible: text("responsible").notNull(),
  approver: text("approver"),
  date: timestamp("date").notNull(),
  unitPrice: decimal("unit_price").notNull(),
  totalValue: decimal("total_value").notNull(),
});

export const insertSupplierSchema = createInsertSchema(suppliers);
export const insertEmployeeSchema = createInsertSchema(employees);
export const insertProductSchema = createInsertSchema(products);
export const insertQuoteSchema = createInsertSchema(quotes);
export const insertPurchaseSchema = createInsertSchema(purchases);

export type Supplier = typeof suppliers.$inferSelect;
export type Employee = typeof employees.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Quote = typeof quotes.$inferSelect;
export type Purchase = typeof purchases.$inferSelect;

export type InsertSupplier = z.infer<typeof insertSupplierSchema>;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type InsertPurchase = z.infer<typeof insertPurchaseSchema>;
