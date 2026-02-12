import { useDocuments } from "../hooks/useDocuments";
import { DocumentList } from "../components/DocumentList";

export default function Documents() {
  const { documents } = useDocuments();

  return (
    <main className="page">
      <h2>Documentos</h2>

      <DocumentList
        documents={documents}
        enableFilter
        
      />
    </main>
  );
}