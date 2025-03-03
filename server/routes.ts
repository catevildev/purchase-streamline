import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSupplierSchema, insertEmployeeSchema, insertProductSchema, insertQuoteSchema, insertPurchaseSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Suppliers
  app.get("/api/suppliers", async (_req, res) => {
    const suppliers = await storage.getSuppliers();
    res.json(suppliers);
  });

  app.post("/api/suppliers", async (req, res) => {
    const parsed = insertSupplierSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const supplier = await storage.createSupplier(parsed.data);
    res.json(supplier);
  });

  app.patch("/api/suppliers/:id", async (req, res) => {
    const parsed = insertSupplierSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const supplier = await storage.updateSupplier(Number(req.params.id), parsed.data);
    res.json(supplier);
  });

  app.delete("/api/suppliers/:id", async (req, res) => {
    await storage.deleteSupplier(Number(req.params.id));
    res.status(204).send();
  });

  // Employees
  app.get("/api/employees", async (_req, res) => {
    const employees = await storage.getEmployees();
    res.json(employees);
  });

  app.post("/api/employees", async (req, res) => {
    const parsed = insertEmployeeSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const employee = await storage.createEmployee(parsed.data);
    res.json(employee);
  });

  app.patch("/api/employees/:id", async (req, res) => {
    const parsed = insertEmployeeSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const employee = await storage.updateEmployee(Number(req.params.id), parsed.data);
    res.json(employee);
  });

  app.delete("/api/employees/:id", async (req, res) => {
    await storage.deleteEmployee(Number(req.params.id));
    res.status(204).send();
  });

  // Products
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.post("/api/products", async (req, res) => {
    const parsed = insertProductSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const product = await storage.createProduct(parsed.data);
    res.json(product);
  });

  app.patch("/api/products/:id", async (req, res) => {
    const parsed = insertProductSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const product = await storage.updateProduct(Number(req.params.id), parsed.data);
    res.json(product);
  });

  app.delete("/api/products/:id", async (req, res) => {
    await storage.deleteProduct(Number(req.params.id));
    res.status(204).send();
  });

  // Quotes
  app.get("/api/quotes", async (_req, res) => {
    const quotes = await storage.getQuotes();
    res.json(quotes);
  });

  app.post("/api/quotes", async (req, res) => {
    const parsed = insertQuoteSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const quote = await storage.createQuote(parsed.data);
    res.json(quote);
  });

  app.patch("/api/quotes/:id", async (req, res) => {
    const parsed = insertQuoteSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const quote = await storage.updateQuote(Number(req.params.id), parsed.data);
    res.json(quote);
  });

  app.delete("/api/quotes/:id", async (req, res) => {
    await storage.deleteQuote(Number(req.params.id));
    res.status(204).send();
  });

  // Purchases
  app.get("/api/purchases", async (_req, res) => {
    const purchases = await storage.getPurchases();
    res.json(purchases);
  });

  app.post("/api/purchases", async (req, res) => {
    const parsed = insertPurchaseSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const purchase = await storage.createPurchase(parsed.data);
    res.json(purchase);
  });

  app.patch("/api/purchases/:id", async (req, res) => {
    const parsed = insertPurchaseSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const purchase = await storage.updatePurchase(Number(req.params.id), parsed.data);
    res.json(purchase);
  });

  app.delete("/api/purchases/:id", async (req, res) => {
    await storage.deletePurchase(Number(req.params.id));
    res.status(204).send();
  });

  const httpServer = createServer(app);
  return httpServer;
}
