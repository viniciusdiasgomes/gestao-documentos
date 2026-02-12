import "../styles/documents.css";
import { useDocuments } from "../hooks/useDocuments";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Documents() {
  const { documents } = useDocuments();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = documents
    .filter((doc) =>
      `${doc.title} ${doc.description ?? ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    );

  return (
    <main className="documents-container">
      <button className="back-button" onClick={() => navigate("/")}>
         Voltar
      </button>

      <header className="documents-header">
        <h2>Central de Documentos</h2>
        <p>Visualize, organize e acompanhe seus documentos</p>
      </header>

      <div className="documents-search">
        <input
          type="text"
          placeholder="Buscar por título ou descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <section className="documents-list">
        {filtered.length === 0 ? (
          <p className="empty">Nenhum documento encontrado.</p>
        ) : (
          filtered.map((doc) => (
            <Link
              key={doc.id}
              to={`/documents/${doc.id}`}
              className="document-card"
            >
              <div className="document-info">
                <strong>{doc.title}</strong>

                {doc.description && (
                  <span className="doc-desc">
                    {doc.description}
                  </span>
                )}

                <span className="doc-file">
                  📎 {doc.original_name}
                </span>
              </div>

              <span className="doc-date">
                {new Date(doc.created_at).toLocaleDateString()}
              </span>
            </Link>
          ))
        )}
      </section>
    </main>
  );
}