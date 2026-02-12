import "../styles/documents.css";
import { useDocuments } from "../hooks/useDocuments";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
    )
    .slice(0, 7);

  return (

    <main className="documents-container">
        <button
  className="back-button"
  onClick={() => navigate("/")}
>
Voltar
</button>
      {/* CABEÇALHO */}
      <header className="documents-header">
        <h2>Central de Documentos</h2>
        <p>Visualize, organize e acompanhe seus documentos</p>
      </header>

      {/* BUSCA */}
      <div className="documents-search">
        <input
          type="text"
          placeholder="Buscar por título ou descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LISTA */}
      <section className="documents-list">
        {filtered.length === 0 ? (
          <p className="empty">Nenhum documento encontrado.</p>
        ) : (
          filtered.map((doc) => (
            <div key={doc.id} className="document-card">
              <div className="document-info">
                <strong>{doc.title}</strong>
                <span>
                  {new Date(doc.created_at).toLocaleDateString()}
                </span>
              </div>

              <a
                href={`http://localhost:3333/uploads/${doc.file}`}
                target="_blank"
                rel="noreferrer"
                className="document-action"
              >
                Abrir
              </a>
            </div>
          ))
        )}
      </section>
    </main>
  );
}