import "../styles/document-details.css";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";
import { useEffect, useState } from "react";

export default function DocumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);


  const [editingId, setEditingId] = useState<number | null>(null);
const [editingText, setEditingText] = useState("");



  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/documents/${id}`);

        if (!res.ok) {
          setDoc(null);
          return;
        }

        const data = await res.json();
        setDoc(data);
      } catch (err) {
        console.error(err);
        setDoc(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);


  async function reloadDocument() {
  try {
    const res = await fetch(`${API_URL}/documents/${id}`);

    if (!res.ok) {
      throw new Error("Erro ao recarregar documento");
    }

    const data = await res.json();
    setDoc(data);
  } catch (err) {
    console.error(err);
  }
}

  async function handleDownload() {
    try {
      const response = await fetch(
        `${API_URL}/uploads/${doc.filename}`
      );

      if (!response.ok) {
        throw new Error("Erro ao baixar arquivo");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = doc.original_name || "documento";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Não foi possível baixar o arquivo.");
    }
  }

async function handleAddComment() {
  if (!comment.trim()) return;

  try {
    setSending(true);

    const res = await fetch(
      `${API_URL}/documents/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: comment
        })
      }
    );

    if (!res.ok) {
      throw new Error("Erro ao comentar");
    }

    setComment("");

    // Recarrega documento (pra atualizar comentários)
    const updated = await fetch(
      `${API_URL}/documents/${id}`
    ).then(r => r.json());

    setDoc(updated);
  } catch (err) {
    console.error(err);
    alert("Erro ao adicionar comentário");
  } finally {
    setSending(false);
  }
}

async function handleDeleteComment(commentId: number) {
  if (!confirm("Deseja excluir este comentário?")) return;

  try {
    await fetch(
      `${API_URL}/documents/${id}/comments/${commentId}`,
      { method: "DELETE" }
    );

    reloadDocument();
  } catch (err) {
    console.error(err);
    alert("Erro ao excluir comentário");
  }
}


async function handleUpdateComment(commentId: number) {
  if (!editingText.trim()) return;

  try {
    await fetch(
      `${API_URL}/documents/${id}/comments/${commentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editingText }),
      }
    );

    setEditingId(null);
    setEditingText("");
    reloadDocument();
  } catch (err) {
    console.error(err);
    alert("Erro ao editar comentário");
  }
}


  if (loading) {
    return <p>Carregando documento...</p>;
  }

  if (!doc) {
    return (
      <div style={{ padding: 20 }}>
        <p>Documento não encontrado.</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }


   const isPdf = doc.filename?.toLowerCase().endsWith(".pdf");
   const isImage = /\.(png|jpg|jpeg|webp)$/i.test(doc.filename);
  return (
    <main className="doc-page-wrapper">
      <div className="doc-page">

        {/* HEADER */}
        <header className="doc-header">
          <button
            className="btn-back"
            onClick={() => navigate(-1)}
          >
             Voltar
          </button>

          <div className="doc-header-text">
            <h1>{doc.title}</h1>
            {doc.description && <p>{doc.description}</p>}
          </div>

          <div className="doc-actions">
            <button
              className="btn-action primary"
              onClick={handleDownload}
            >
              Baixar arquivo
            </button>
          </div>
        </header>

{/* PREVIEW */}
<section className="doc-preview-card compact">
  <div className="doc-preview-layout">
    
    <div className="doc-preview-wrapper small">
     {isPdf && (
  <object
    data={`${API_URL}/uploads/${doc.filename}`}
    type="application/pdf"
    className="doc-preview-pdf"
    width="100%"
    height="500px"
  >
    <p>Seu navegador não pode exibir o PDF. 
       <a href={`${API_URL}/uploads/${doc.filename}`}>Clique aqui para baixar.</a>
    </p>
  </object>
)}

      {isImage && (
        <img
          src={`${API_URL}/uploads/${doc.filename}`}
          alt={doc.title}
          className="doc-preview-image"
        />
      )}
    </div>

    <div className="doc-preview-actions">
      <button
        className="btn-preview"
        onClick={() =>
          window.open(
            `${API_URL}/uploads/${doc.filename}`,
            "_blank"
          )
        }
      >
        Visualizar em tela cheia
      </button>
    </div>

  </div>
</section>

        {/* COMENTÁRIOS */}
        <section className="doc-comments-card">
          <h3>Comentários</h3>
<div className="comment-form">
  <textarea
    placeholder="Escreva um comentário..."
    value={comment}
    onChange={(e) => setComment(e.target.value)}
  />

  <button
    onClick={handleAddComment}
    disabled={sending}
  >
    {sending ? "Salvando..." : "Adicionar comentário"}
  </button>
</div>

          {doc.comments.length === 0 ? (
            <p className="muted">
              Nenhum comentário ainda.
            </p>
          ) : (
            doc.comments.map((c: any) => (
  <div key={c.id} className="comment-item">

    {editingId === c.id ? (
      <>
        <textarea
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
        />

        <div className="comment-actions">
          <button
            className="btn-action primary"
            onClick={() => handleUpdateComment(c.id)}
          >
            Salvar
          </button>

          <button
            className="btn-action"
            onClick={() => setEditingId(null)}
          >
            Cancelar
          </button>
        </div>
      </>
    ) : (
      <>
        <p>{c.text}</p>

        <span>
          {new Date(c.created_at).toLocaleString()}
        </span>

        <div className="comment-actions">
          <button
            className="btn-action"
            onClick={() => {
              setEditingId(c.id);
              setEditingText(c.text);
            }}
          >
            Editar
          </button>

          <button
            className="btn-action"
            onClick={() => handleDeleteComment(c.id)}
          >
            Excluir
          </button>
        </div>
      </>
    )}

  </div>
))
          )}
        </section>

      </div>
    </main>
  );
}
