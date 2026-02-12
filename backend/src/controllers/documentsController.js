import { pool } from "../database/db.js";

export async function listDocuments(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id,
        title,
        description,
        filename,
        original_name,
        created_at
      FROM documents
      ORDER BY created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar documentos" });
  }
}

export async function createDocument(req, res) {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!title || !file) {
      return res.status(400).json({
        error: "Título e arquivo são obrigatórios",
      });
    }

    const [result] = await pool.query(
      `
      INSERT INTO documents (title, description, filename, original_name)
      VALUES (?, ?, ?, ?)
      `,
      [
        title,
        description || null,
        file.filename,
        file.originalname,
      ]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao salvar documento" });
  }
}
export async function getDocumentById(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const [[doc]] = await pool.query(
      "SELECT * FROM documents WHERE id = ?",
      [id]
    );

    if (!doc) {
      return res.status(404).json({ error: "Documento não encontrado" });
    }

    const [comments] = await pool.query(
      `
      SELECT id, content AS text, created_at
      FROM comments
      WHERE document_id = ?
      ORDER BY created_at DESC
      `,
      [id]
    );

    res.json({
      ...doc,
      comments,
    });
  } catch (err) {
    console.error("Erro ao buscar documento:", err);
    res.status(500).json({ error: "Erro ao buscar documento" });
  }
}