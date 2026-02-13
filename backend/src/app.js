import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";


import { pool } from "./database/db.js";
import documentsRoutes from "./routes/documents.routes.js";



const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(express.json());

//testar banco de dados
app.get("/test-db", async (req, res) => {
  const [rows] = await pool.query("SELECT 1");
  res.json({ ok: true });
});


app.use("/uploads", express.static("uploads"));
app.use("/documents", documentsRoutes);



app.get("/", (req, res) => {
  res.send("API de Gestão de Documentos rodando 🚀");
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
