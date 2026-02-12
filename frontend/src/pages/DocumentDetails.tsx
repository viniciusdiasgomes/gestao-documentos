import "../styles/document-details.css";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";
import { useEffect, useState } from "react";

export default function DocumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  {isPdf && (
    <>
      <iframe
        src={`${API_URL}/uploads/${doc.filename}`}
        title={doc.title}
        className="doc-preview-pdf"
      />

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
    </>
  )}

  {isImage && (
    <img
      src={`${API_URL}/uploads/${doc.filename}`}
      alt={doc.title}
      className="doc-preview-image"
      onClick={() =>
        window.open(
          `${API_URL}/uploads/${doc.filename}`,
          "_blank"
        )
      }
    />
  )}

</section>

        {/* COMENTÁRIOS */}
        <section className="doc-comments-card">
          <h3>Comentários</h3>

          {doc.comments.length === 0 ? (
            <p className="muted">
              Nenhum comentário ainda.
            </p>
          ) : (
            doc.comments.map((c: any) => (
              <div key={c.id} className="comment-item">
                <p>{c.text}</p>
                <span>
                  {new Date(c.created_at).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </section>

      </div>
    </main>
  );
}
