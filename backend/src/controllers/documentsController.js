import { pool } from "../database/db.js";

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
