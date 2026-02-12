import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";

type Props = {
  documents: any[];
  limit?: number;
  order?: "asc" | "desc";
};

export function DocumentList({
  documents,
  limit,
  order = "desc",
}: Props) {
  const navigate = useNavigate();

  const sorted = [...documents].sort((a, b) =>
    order === "desc"
      ? new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
      : new Date(a.created_at).getTime() -
        new Date(b.created_at).getTime()
  );

  const visible = limit ? sorted.slice(0, limit) : sorted;

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este documento?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/documents/${id}`, {
        method: "DELETE",
      });

      // Recarrega a página após excluir
      window.location.reload();
    } catch {
      alert("Erro ao excluir documento");
    }
  }

  return (
    <div className="document-list">
      {visible.map((doc) => (
        <div key={doc.id} className="document-card">
          <div className="document-info">
            <div className="doc-title-row">
              <strong>{doc.title}</strong>

              {(doc.comments_count ?? 0) > 0 && (
                <span className="badge-comment">
                  💬 {doc.comments_count} comentário
                </span>
              )}
            </div>

            {doc.description && (
              <span className="doc-desc">{doc.description}</span>
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
      ))}
    </div>
  );
}