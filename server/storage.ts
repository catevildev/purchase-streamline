import { db } from './db';
import type {
  Supplier, InsertSupplier,
  Employee, InsertEmployee,
  Product, InsertProduct,
  Quote, InsertQuote,
  Purchase, InsertPurchase
} from "@shared/schema";

export interface IStorage {
  // Suppliers
  getSuppliers(): Promise<Supplier[]>;
  getSupplier(id: number): Promise<Supplier | undefined>;
  createSupplier(supplier: InsertSupplier): Promise<Supplier>;
  updateSupplier(id: number, supplier: InsertSupplier): Promise<Supplier>;
  deleteSupplier(id: number): Promise<void>;

  // Employees
  getEmployees(): Promise<Employee[]>;
  getEmployee(id: number): Promise<Employee | undefined>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: number, employee: InsertEmployee): Promise<Employee>;
  deleteEmployee(id: number): Promise<void>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: InsertProduct): Promise<Product>;
  deleteProduct(id: number): Promise<void>;

  // Quotes
  getQuotes(): Promise<Quote[]>;
  getQuote(id: number): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  updateQuote(id: number, quote: InsertQuote): Promise<Quote>;
  deleteQuote(id: number): Promise<void>;

  // Purchases
  getPurchases(): Promise<Purchase[]>;
  getPurchase(id: number): Promise<Purchase | undefined>;
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  updatePurchase(id: number, purchase: InsertPurchase): Promise<Purchase>;
  deletePurchase(id: number): Promise<void>;
}

export class MySQLStorage implements IStorage {
  // Suppliers
  async getSuppliers(): Promise<Supplier[]> {
    const [rows] = await db.execute('SELECT * FROM suppliers');
    return rows as Supplier[];
  }

  async getSupplier(id: number): Promise<Supplier | undefined> {
    const [rows] = await db.execute('SELECT * FROM suppliers WHERE id = ?', [id]);
    const suppliers = rows as Supplier[];
    return suppliers[0];
  }

  async createSupplier(supplier: InsertSupplier): Promise<Supplier> {
    const [result] = await db.execute(
      'INSERT INTO suppliers (name, email, phone) VALUES (?, ?, ?)',
      [supplier.name, supplier.email, supplier.phone || null]
    );
    const id = (result as any).insertId;
    return { ...supplier, id };
  }

  async updateSupplier(id: number, supplier: InsertSupplier): Promise<Supplier> {
    await db.execute(
      'UPDATE suppliers SET name = ?, email = ?, phone = ? WHERE id = ?',
      [supplier.name, supplier.email, supplier.phone || null, id]
    );
    return { ...supplier, id };
  }

  async deleteSupplier(id: number): Promise<void> {
    await db.execute('DELETE FROM suppliers WHERE id = ?', [id]);
  }

  // Employees
  async getEmployees(): Promise<Employee[]> {
    const [rows] = await db.execute('SELECT * FROM employees');
    return rows as Employee[];
  }

  async getEmployee(id: number): Promise<Employee | undefined> {
    const [rows] = await db.execute('SELECT * FROM employees WHERE id = ?', [id]);
    const employees = rows as Employee[];
    return employees[0];
  }

  async createEmployee(employee: InsertEmployee): Promise<Employee> {
    const [result] = await db.execute(
      'INSERT INTO employees (name, email, phone, department, approver) VALUES (?, ?, ?, ?, ?)',
      [employee.name, employee.email, employee.phone || null, employee.department, employee.approver || null]
    );
    const id = (result as any).insertId;
    return { ...employee, id };
  }

  async updateEmployee(id: number, employee: InsertEmployee): Promise<Employee> {
    await db.execute(
      'UPDATE employees SET name = ?, email = ?, phone = ?, department = ?, approver = ? WHERE id = ?',
      [employee.name, employee.email, employee.phone || null, employee.department, employee.approver || null, id]
    );
    return { ...employee, id };
  }

  async deleteEmployee(id: number): Promise<void> {
    await db.execute('DELETE FROM employees WHERE id = ?', [id]);
  }

  // Products
  async getProducts(): Promise<Product[]> {
    const [rows] = await db.execute('SELECT * FROM products');
    return rows as Product[];
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    const products = rows as Product[];
    return products[0];
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [result] = await db.execute(
      'INSERT INTO products (name, category, unit, supplier) VALUES (?, ?, ?, ?)',
      [product.name, product.category, product.unit, product.supplier || null]
    );
    const id = (result as any).insertId;
    return { ...product, id };
  }

  async updateProduct(id: number, product: InsertProduct): Promise<Product> {
    await db.execute(
      'UPDATE products SET name = ?, category = ?, unit = ?, supplier = ? WHERE id = ?',
      [product.name, product.category, product.unit, product.supplier || null, id]
    );
    return { ...product, id };
  }

  async deleteProduct(id: number): Promise<void> {
    await db.execute('DELETE FROM products WHERE id = ?', [id]);
  }

  // Quotes
  async getQuotes(): Promise<Quote[]> {
    const [rows] = await db.execute('SELECT * FROM quotes');
    return rows as Quote[];
  }

  async getQuote(id: number): Promise<Quote | undefined> {
    const [rows] = await db.execute('SELECT * FROM quotes WHERE id = ?', [id]);
    const quotes = rows as Quote[];
    return quotes[0];
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    const [result] = await db.execute(
      'INSERT INTO quotes (productId, quantity, unit, responsible, supplier1, price1, date1, supplier2, price2, date2, supplier3, price3, date3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        quote.productId,
        quote.quantity,
        quote.unit,
        quote.responsible,
        quote.supplier1 || null,
        quote.price1 || null,
        quote.date1 || null,
        quote.supplier2 || null,
        quote.price2 || null,
        quote.date2 || null,
        quote.supplier3 || null,
        quote.price3 || null,
        quote.date3 || null
      ]
    );
    const id = (result as any).insertId;
    return { ...quote, id };
  }

  async updateQuote(id: number, quote: InsertQuote): Promise<Quote> {
    await db.execute(
      'UPDATE quotes SET productId = ?, quantity = ?, unit = ?, responsible = ?, supplier1 = ?, price1 = ?, date1 = ?, supplier2 = ?, price2 = ?, date2 = ?, supplier3 = ?, price3 = ?, date3 = ? WHERE id = ?',
      [
        quote.productId,
        quote.quantity,
        quote.unit,
        quote.responsible,
        quote.supplier1 || null,
        quote.price1 || null,
        quote.date1 || null,
        quote.supplier2 || null,
        quote.price2 || null,
        quote.date2 || null,
        quote.supplier3 || null,
        quote.price3 || null,
        quote.date3 || null,
        id
      ]
    );
    return { ...quote, id };
  }

  async deleteQuote(id: number): Promise<void> {
    await db.execute('DELETE FROM quotes WHERE id = ?', [id]);
  }

  // Purchases
  async getPurchases(): Promise<Purchase[]> {
    const [rows] = await db.execute('SELECT * FROM purchases');
    return rows as Purchase[];
  }

  async getPurchase(id: number): Promise<Purchase | undefined> {
    const [rows] = await db.execute('SELECT * FROM purchases WHERE id = ?', [id]);
    const purchases = rows as Purchase[];
    return purchases[0];
  }

  async createPurchase(purchase: InsertPurchase): Promise<Purchase> {
    const [result] = await db.execute(
      'INSERT INTO purchases (productId, quantity, unit, supplier, responsible, approver, date, unitPrice, totalValue) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        purchase.productId,
        purchase.quantity,
        purchase.unit,
        purchase.supplier,
        purchase.responsible,
        purchase.approver || null,
        purchase.date,
        purchase.unitPrice,
        purchase.totalValue
      ]
    );
    const id = (result as any).insertId;
    return { ...purchase, id };
  }

  async updatePurchase(id: number, purchase: InsertPurchase): Promise<Purchase> {
    await db.execute(
      'UPDATE purchases SET productId = ?, quantity = ?, unit = ?, supplier = ?, responsible = ?, approver = ?, date = ?, unitPrice = ?, totalValue = ? WHERE id = ?',
      [
        purchase.productId,
        purchase.quantity,
        purchase.unit,
        purchase.supplier,
        purchase.responsible,
        purchase.approver || null,
        purchase.date,
        purchase.unitPrice,
        purchase.totalValue,
        id
      ]
    );
    return { ...purchase, id };
  }

  async deletePurchase(id: number): Promise<void> {
    await db.execute('DELETE FROM purchases WHERE id = ?', [id]);
  }
}

export const storage = new MySQLStorage();