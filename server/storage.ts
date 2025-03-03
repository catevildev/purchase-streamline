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

export class PostgresStorage implements IStorage {
  // Suppliers
  async getSuppliers(): Promise<Supplier[]> {
    return await db`SELECT * FROM suppliers ORDER BY id`;
  }

  async getSupplier(id: number): Promise<Supplier | undefined> {
    const suppliers = await db`SELECT * FROM suppliers WHERE id = ${id}`;
    return suppliers[0];
  }

  async createSupplier(supplier: InsertSupplier): Promise<Supplier> {
    const result = await db`
      INSERT INTO suppliers (name, email, phone)
      VALUES (${supplier.name}, ${supplier.email}, ${supplier.phone})
      RETURNING *
    `;
    return result[0];
  }

  async updateSupplier(id: number, supplier: InsertSupplier): Promise<Supplier> {
    const result = await db`
      UPDATE suppliers
      SET name = ${supplier.name},
          email = ${supplier.email},
          phone = ${supplier.phone}
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  }

  async deleteSupplier(id: number): Promise<void> {
    await db`DELETE FROM suppliers WHERE id = ${id}`;
  }

  // Employees
  async getEmployees(): Promise<Employee[]> {
    return await db`SELECT * FROM employees ORDER BY id`;
  }

  async getEmployee(id: number): Promise<Employee | undefined> {
    const employees = await db`SELECT * FROM employees WHERE id = ${id}`;
    return employees[0];
  }

  async createEmployee(employee: InsertEmployee): Promise<Employee> {
    const result = await db`
      INSERT INTO employees (name, email, phone, department, approver)
      VALUES (${employee.name}, ${employee.email}, ${employee.phone}, ${employee.department}, ${employee.approver})
      RETURNING *
    `;
    return result[0];
  }

  async updateEmployee(id: number, employee: InsertEmployee): Promise<Employee> {
    const result = await db`
      UPDATE employees
      SET name = ${employee.name},
          email = ${employee.email},
          phone = ${employee.phone},
          department = ${employee.department},
          approver = ${employee.approver}
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  }

  async deleteEmployee(id: number): Promise<void> {
    await db`DELETE FROM employees WHERE id = ${id}`;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return await db`SELECT * FROM products ORDER BY id`;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const products = await db`SELECT * FROM products WHERE id = ${id}`;
    return products[0];
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db`
      INSERT INTO products (name, category, unit, supplier)
      VALUES (${product.name}, ${product.category}, ${product.unit}, ${product.supplier})
      RETURNING *
    `;
    return result[0];
  }

  async updateProduct(id: number, product: InsertProduct): Promise<Product> {
    const result = await db`
      UPDATE products
      SET name = ${product.name},
          category = ${product.category},
          unit = ${product.unit},
          supplier = ${product.supplier}
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  }

  async deleteProduct(id: number): Promise<void> {
    await db`DELETE FROM products WHERE id = ${id}`;
  }

  // Quotes
  async getQuotes(): Promise<Quote[]> {
    return await db`SELECT * FROM quotes ORDER BY id`;
  }

  async getQuote(id: number): Promise<Quote | undefined> {
    const quotes = await db`SELECT * FROM quotes WHERE id = ${id}`;
    return quotes[0];
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    const result = await db`
      INSERT INTO quotes (
        product_id, quantity, unit, responsible,
        supplier1, price1, date1,
        supplier2, price2, date2,
        supplier3, price3, date3
      )
      VALUES (
        ${quote.productId}, ${quote.quantity}, ${quote.unit}, ${quote.responsible},
        ${quote.supplier1}, ${quote.price1}, ${quote.date1},
        ${quote.supplier2}, ${quote.price2}, ${quote.date2},
        ${quote.supplier3}, ${quote.price3}, ${quote.date3}
      )
      RETURNING *
    `;
    return result[0];
  }

  async updateQuote(id: number, quote: InsertQuote): Promise<Quote> {
    const result = await db`
      UPDATE quotes
      SET product_id = ${quote.productId},
          quantity = ${quote.quantity},
          unit = ${quote.unit},
          responsible = ${quote.responsible},
          supplier1 = ${quote.supplier1},
          price1 = ${quote.price1},
          date1 = ${quote.date1},
          supplier2 = ${quote.supplier2},
          price2 = ${quote.price2},
          date2 = ${quote.date2},
          supplier3 = ${quote.supplier3},
          price3 = ${quote.price3},
          date3 = ${quote.date3}
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  }

  async deleteQuote(id: number): Promise<void> {
    await db`DELETE FROM quotes WHERE id = ${id}`;
  }

  // Purchases
  async getPurchases(): Promise<Purchase[]> {
    return await db`SELECT * FROM purchases ORDER BY id`;
  }

  async getPurchase(id: number): Promise<Purchase | undefined> {
    const purchases = await db`SELECT * FROM purchases WHERE id = ${id}`;
    return purchases[0];
  }

  async createPurchase(purchase: InsertPurchase): Promise<Purchase> {
    const result = await db`
      INSERT INTO purchases (
        product_id, quantity, unit, supplier,
        responsible, approver, date,
        unit_price, total_value
      )
      VALUES (
        ${purchase.productId}, ${purchase.quantity}, ${purchase.unit}, ${purchase.supplier},
        ${purchase.responsible}, ${purchase.approver}, ${purchase.date},
        ${purchase.unitPrice}, ${purchase.totalValue}
      )
      RETURNING *
    `;
    return result[0];
  }

  async updatePurchase(id: number, purchase: InsertPurchase): Promise<Purchase> {
    const result = await db`
      UPDATE purchases
      SET product_id = ${purchase.productId},
          quantity = ${purchase.quantity},
          unit = ${purchase.unit},
          supplier = ${purchase.supplier},
          responsible = ${purchase.responsible},
          approver = ${purchase.approver},
          date = ${purchase.date},
          unit_price = ${purchase.unitPrice},
          total_value = ${purchase.totalValue}
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  }

  async deletePurchase(id: number): Promise<void> {
    await db`DELETE FROM purchases WHERE id = ${id}`;
  }
}

export const storage = new PostgresStorage();