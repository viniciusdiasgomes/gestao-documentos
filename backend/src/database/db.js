import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

// O Render fornece uma variável chamada DATABASE_URL por padrão se o banco for deles
// Se não, você cria uma com esse nome no painel de Environment.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Fundamental para conexões externas
  },
});