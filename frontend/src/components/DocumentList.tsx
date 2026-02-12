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
      ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const visible = limit ? sorted.slice(0, limit) : sorted;

  return (
    <div className="document-list">
      {visible.map((doc) => (
        <Link
          key={doc.id}
          to={`/documents/${doc.id}`}
          className="document-card"
        >
          <div className="document-info">
            {/* TÍTULO */}
            <strong>{doc.title}</strong>

            {/* DESCRIÇÃO / COMENTÁRIO */}
            {doc.description && (
              <span className="doc-description">
                {doc.description}
              </span>
            )}

            {/* ARQUIVO */}
            <span className="doc-file">
              📎 {doc.original_name}
            </span>
          </div>

          {/* DATA */}
          <span className="doc-date">
            {new Date(doc.created_at).toLocaleDateString()}
          </span>
        </Link>
      ))}
    </div>
  );
}