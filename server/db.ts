import { neon } from '@neondatabase/serverless';

let db: any;
let retryCount = 0;
const MAX_RETRIES = 3;

async function connectWithRetry() {
  console.log('Tentando conectar ao PostgreSQL com as seguintes configurações:');
  console.log('Database URL:', process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@'));

  while (retryCount < MAX_RETRIES) {
    try {
      // Criar conexão com o banco
      db = neon(process.env.DATABASE_URL!);

      console.log('Conexão com PostgreSQL estabelecida com sucesso!');

      // Testar conexão
      await db`SELECT 1`;
      console.log('Conexão testada com sucesso!');

      // Criar tabelas se não existirem
      await db`
        CREATE TABLE IF NOT EXISTS suppliers (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255),
          phone VARCHAR(20)
        );
      `;
      console.log('Tabela suppliers verificada/criada');

      await db`
        CREATE TABLE IF NOT EXISTS employees (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          department VARCHAR(100) NOT NULL,
          approver INTEGER
        );
      `;
      console.log('Tabela employees verificada/criada');

      await db`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          unit VARCHAR(10) NOT NULL,
          supplier VARCHAR(255)
        );
      `;
      console.log('Tabela products verificada/criada');

      await db`
        CREATE TABLE IF NOT EXISTS quotes (
          id SERIAL PRIMARY KEY,
          product_id INTEGER NOT NULL REFERENCES products(id),
          quantity VARCHAR(20) NOT NULL,
          unit VARCHAR(10) NOT NULL,
          responsible VARCHAR(255) NOT NULL,
          supplier1 VARCHAR(255),
          price1 DECIMAL(10,2),
          date1 TIMESTAMP,
          supplier2 VARCHAR(255),
          price2 DECIMAL(10,2),
          date2 TIMESTAMP,
          supplier3 VARCHAR(255),
          price3 DECIMAL(10,2),
          date3 TIMESTAMP
        );
      `;
      console.log('Tabela quotes verificada/criada');

      await db`
        CREATE TABLE IF NOT EXISTS purchases (
          id SERIAL PRIMARY KEY,
          product_id INTEGER NOT NULL REFERENCES products(id),
          quantity VARCHAR(20) NOT NULL,
          unit VARCHAR(10) NOT NULL,
          supplier VARCHAR(255) NOT NULL,
          responsible VARCHAR(255) NOT NULL,
          approver VARCHAR(255),
          date TIMESTAMP NOT NULL,
          unit_price DECIMAL(10,2) NOT NULL,
          total_value DECIMAL(10,2) NOT NULL
        );
      `;
      console.log('Tabela purchases verificada/criada');

      break; // Se chegou aqui, conexão foi bem sucedida
    } catch (error) {
      retryCount++;
      console.error(`Tentativa ${retryCount} de ${MAX_RETRIES} falhou:`, error);

      if (retryCount === MAX_RETRIES) {
        console.error('Erro ao conectar com PostgreSQL após todas as tentativas:', error);
        throw error;
      }

      // Esperar 5 segundos antes de tentar novamente
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

// Iniciar conexão
await connectWithRetry();

export { db };