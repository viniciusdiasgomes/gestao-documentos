import { Link } from "react-router-dom";

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
  const sorted = [...documents].sort((a, b) =>
    order === "desc"
      ? new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
      : new Date(a.created_at).getTime() -
      new Date(b.created_at).getTime()
  );

  const visible = limit ? sorted.slice(0, limit) : sorted;

  return (
    <div className="document-list">
      {visible.map((doc) => (
        <div key={doc.id} className="document-card">
          <div className="document-info">
            <div className="doc-title-row">
              <strong>{doc.title}</strong>

              {(doc.comments_count ?? 0) > 0 && (
                <span className="badge-comment">
                  💬 {doc.comments_count} comentario
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
      ))}
    </div>
  );
}