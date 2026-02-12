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
          <a
            href={`${API_URL}/uploads/${doc.filename}`}
            download={doc.original_name}
            className="btn-action primary"
          >
             Salvar
          </a>
        </div>
      </header>

      {/* PDF */}
      <section className="doc-preview-card">
        <iframe
          src={`${API_URL}/uploads/${doc.filename}`}
          title={doc.title}
        />
      </section>

      {/* COMENTÁRIOS */}
      <section className="doc-comments-card">
        <h3>Comentários</h3>

        {doc.comments.length === 0 ? (
          <p className="muted">Nenhum comentário ainda.</p>
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