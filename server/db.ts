import mysql from 'mysql2/promise';

let db: mysql.Connection;

console.log('Tentando conectar ao MySQL com as seguintes configurações:');
console.log('Host:', process.env.DB_HOST);
console.log('User:', process.env.DB_USER);
console.log('Database:', process.env.DB_NAME);

try {
  // Criar conexão com o banco
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  console.log('Conexão com MySQL estabelecida com sucesso!');

  // Criar tabelas se não existirem
  await db.execute(`
    CREATE TABLE IF NOT EXISTS suppliers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(20),
      cnpj VARCHAR(18),
      address TEXT
    );
  `);
  console.log('Tabela suppliers verificada/criada');

  await db.execute(`
    CREATE TABLE IF NOT EXISTS employees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      department VARCHAR(100) NOT NULL,
      approver INT
    );
  `);
  console.log('Tabela employees verificada/criada');

  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      unit VARCHAR(10) NOT NULL,
      supplier VARCHAR(255)
    );
  `);
  console.log('Tabela products verificada/criada');

  await db.execute(`
    CREATE TABLE IF NOT EXISTS quotes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      productId INT NOT NULL,
      quantity VARCHAR(20) NOT NULL,
      unit VARCHAR(10) NOT NULL,
      responsible VARCHAR(255) NOT NULL,
      supplier1 VARCHAR(255),
      price1 DECIMAL(10,2),
      date1 DATETIME,
      supplier2 VARCHAR(255),
      price2 DECIMAL(10,2),
      date2 DATETIME,
      supplier3 VARCHAR(255),
      price3 DECIMAL(10,2),
      date3 DATETIME,
      FOREIGN KEY (productId) REFERENCES products(id)
    );
  `);
  console.log('Tabela quotes verificada/criada');

  await db.execute(`
    CREATE TABLE IF NOT EXISTS purchases (
      id INT AUTO_INCREMENT PRIMARY KEY,
      productId INT NOT NULL,
      quantity VARCHAR(20) NOT NULL,
      unit VARCHAR(10) NOT NULL,
      supplier VARCHAR(255) NOT NULL,
      responsible VARCHAR(255) NOT NULL,
      approver VARCHAR(255),
      date DATETIME NOT NULL,
      unitPrice DECIMAL(10,2) NOT NULL,
      totalValue DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (productId) REFERENCES products(id)
    );
  `);
  console.log('Tabela purchases verificada/criada');

} catch (error) {
  console.error('Erro ao conectar com MySQL:', error);
  throw error;
}

export { db };