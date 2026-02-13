import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import fs from "fs";

import { pool } from "./database/db.js";
import documentsRoutes from "./routes/documents.routes.js";



const PORT = process.env.PORT || 3333;

const app = express();

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Pasta 'uploads' criada com sucesso! ✅");
}
app.use(cors());
app.use(express.json());

//testar banco de dados
app.get("/test-db", async (req, res) => {
  try {
    const client = await pool.connect(); // Tenta estabelecer a conexão
    const result = await client.query("SELECT NOW()");
    client.release(); // Libera o cliente de volta para o pool
    res.json({ 
      status: "Conectado com sucesso! ✅", 
      time: result.rows[0].now 
    });
  } catch (err) {
    console.error("ERRO NO BANCO:", err.message);
    res.status(500).json({ 
      status: "Erro ao conectar ❌", 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});


app.use("/uploads", express.static("uploads"));
app.use("/documents", documentsRoutes);



app.get("/", (req, res) => {
  res.send("API de Gestão de Documentos rodando 🚀");
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
