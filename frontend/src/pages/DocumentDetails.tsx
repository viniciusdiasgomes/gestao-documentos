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
    <main className="doc-details">
      <button onClick={() => navigate(-1)}>Voltar</button>

      <h2>{doc.title}</h2>

      {doc.description && <p>{doc.description}</p>}

      {/* PDF */}
      <iframe
        src={`${API_URL}/uploads/${doc.filename}`}
        width="100%"
        height="800px"
        style={{ border: "none", marginTop: "1rem" }}
        title={doc.title}
      />

      {/* Comentários */}
      <section className="comments">
        <h3>Comentários</h3>

        {doc.comments.length === 0 ? (
          <p>Nenhum comentário ainda.</p>
        ) : (
          doc.comments.map((c: any) => (
            <div key={c.id}>
              <p>{c.text}</p>
              <small>
                {new Date(c.created_at).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
