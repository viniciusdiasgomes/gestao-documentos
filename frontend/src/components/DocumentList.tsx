type Props = {
  documents: any[];
  limit?: number;
  order?: "asc" | "desc";
  enableFilter?: boolean;
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
        <div key={doc.id} className="document-card">
          <strong>{doc.title}</strong>
          <span>
            {new Date(doc.created_at).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
}