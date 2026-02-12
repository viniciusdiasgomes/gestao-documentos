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
      <div key={doc.id} className="document-card">
        <div className="document-info">
          <div className="doc-title-row">
  <strong>{doc.title}</strong>

 {(doc.comments_count ?? 0) > 0 && (
  <span className="badge-comment">
    {doc.comments_count} comentario
  </span>
)}
</div>

          {doc.description && (
            <span className="doc-desc">
              {doc.description}
            </span>
          )}

          <span className="doc-file">
            📎 {doc.original_name}
          </span>
        </div>

        <div className="document-right">
          <span className="doc-date">
            {new Date(doc.created_at).toLocaleDateString()}
          </span>

          <Link
            to={`/documents/${doc.id}`}
            className="btn-view-doc"
          >
            Ver documento
          </Link>
        </div>
      </div>
    ))
  )}
</section>
    </main>
  );
}