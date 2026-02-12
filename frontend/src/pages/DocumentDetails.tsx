import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";
import { useEffect, useState } from "react";

export default function DocumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/documents/${id}`)
      .then((res) => res.json())
      .then(setDoc);
  }, [id]);

  if (!doc) return <p>Carregando...</p>;

  return (
    <main className="doc-details">
      <button className="back-button" onClick={() => navigate(-1)}>
         Voltar
      </button>

      <h2>{doc.title}</h2>

      {doc.description && <p>{doc.description}</p>}

      <a
        href={`${API_URL}/uploads/${doc.filename}`}
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
      >
        📄 Visualizar / Baixar documento
      </a>

      <section className="comments">
        <h3>Comentários</h3>

        {doc.comments.length === 0 ? (
          <p>Nenhum comentário ainda.</p>
        ) : (
          doc.comments.map((c: any) => (
            <div key={c.id} className="comment">
              <p>{c.text}</p>
              <span>
                {new Date(c.created_at).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </section>
    </main>
  );
}