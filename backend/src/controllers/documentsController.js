import { pool } from "../database/db.js";

/* ================= DOCUMENTS ================= */

export async function listDocuments(req, res) {
  try {
    const { rows } = await pool.query(`
      SELECT 
        d.id,
        d.title,
        d.description,
        d.filename,
        d.original_name,
        d.created_at,
        COUNT(c.id) AS comments_count
      FROM documents d
      LEFT JOIN comments c ON c.document_id = d.id
      GROUP BY d.id
      ORDER BY d.created_at DESC
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

    const { rows } = await pool.query(
      `
      INSERT INTO documents (title, description, filename, original_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      [
        title,
        description || null,
        file.filename,
        file.originalname,
      ]
    );

    res.status(201).json({
      id: rows[0].id,
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

    const { rows: docs } = await pool.query(
      "SELECT * FROM documents WHERE id = $1",
      [id]
    );

    if (!docs.length) {
      return res.status(404).json({ error: "Documento não encontrado" });
    }

    const { rows: comments } = await pool.query(
      `
      SELECT id, content AS text, created_at
      FROM comments
      WHERE document_id = $1
      ORDER BY created_at DESC
      `,
      [id]
    );

    res.json({
      ...docs[0],
      comments,
    });
  } catch (err) {
    console.error("Erro ao buscar documento:", err);
    res.status(500).json({ error: "Erro ao buscar documento" });
  }
}

/* ================= COMMENTS ================= */

export async function createComment(req, res) {
  try {
    const documentId = Number(req.params.id);
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        error: "Comentário é obrigatório"
      });
    }

    const { rowCount } = await pool.query(
      "SELECT id FROM documents WHERE id = $1",
      [documentId]
    );

    if (!rowCount) {
      return res.status(404).json({
        error: "Documento não encontrado"
      });
    }

    await pool.query(
      `
      INSERT INTO comments (document_id, content)
      VALUES ($1, $2)
      `,
      [documentId, content]
    );

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Erro ao salvar comentário"
    });
  }
}

export async function updateComment(req, res) {
  try {
    const commentId = Number(req.params.commentId);
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Comentário vazio" });
    }

    await pool.query(
      `UPDATE comments SET content = $1 WHERE id = $2`,
      [content, commentId]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao editar comentário" });
  }
}

export async function deleteComment(req, res) {
  try {
    const commentId = Number(req.params.commentId);

    await pool.query(
      `DELETE FROM comments WHERE id = $1`,
      [commentId]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir comentário" });
  }
}

/* ================= UPDATE / DELETE DOCUMENT ================= */

export async function updateDocument(req, res) {
  try {
    const documentId = Number(req.params.id);
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "Título é obrigatório"
      });
    }

    await pool.query(
      `
      UPDATE documents
      SET title = $1, description = $2
      WHERE id = $3
      `,
      [title, description || null, documentId]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Erro ao editar documento"
    });
  }
}

export async function deleteDocument(req, res) {
  try {
    const documentId = Number(req.params.id);

    await pool.query(
      `DELETE FROM comments WHERE document_id = $1`,
      [documentId]
    );

    await pool.query(
      `DELETE FROM documents WHERE id = $1`,
      [documentId]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Erro ao excluir documento"
    });
  }
}
