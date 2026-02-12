import "../styles/documents.css";
import { useDocuments } from "../hooks/useDocuments";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../services/api";

export default function Documents() {
  const { documents } = useDocuments();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este documento?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/documents/${id}`, {
        method: "DELETE",
      });

      // forma simples e segura de atualizar a lista
      window.location.reload();
    } catch {
      alert("Erro ao excluir documento");
    }
  }

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
                      💬 {doc.comments_count}
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

                <div className="doc-actions-inline">
                  <Link
                    to={`/documents/${doc.id}`}
                    className="btn-view-doc"
                  >
                    Ver
                  </Link>

                  <button
                    className="btn-icon edit"
                    onClick={() =>
                      navigate(`/documents/${doc.id}/edit`)
                    }
                    title="Editar documento"
                  >
                    ✏️
                  </button>

                  <button
                    className="btn-icon delete"
                    onClick={() => handleDelete(doc.id)}
                    title="Excluir documento"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
