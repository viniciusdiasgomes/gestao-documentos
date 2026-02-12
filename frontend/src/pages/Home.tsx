import { useDocuments } from "../hooks/useDocuments";
import { DocumentList } from "../components/DocumentList";

export default function Home() {
  const { documents } = useDocuments();

  return (
    <main className="home">

      {/* APRESENTAÇÃO */}
      <section className="home-intro">
        <h2>Sistema de Gestão de Documentos</h2>
        <p>
          Centralize uploads, organização e comentários
          em um ambiente seguro e profissional.
        </p>
      </section>

      {/* AÇÕES */}
      <section className="home-actions">
        <a href="/documents" className="action-card">
          <h3>📂 Ver documentos</h3>
          <p>Acesse todos os documentos cadastrados</p>
        </a>

        <a href="/upload" className="action-card">
          <h3>⬆ Enviar documentos</h3>
          <p>Faça upload de novos arquivos</p>
        </a>
      </section>

      {/* LISTA RESUMIDA */}
      <section className="home-documents">
        <h3>Últimos documentos</h3>

        <DocumentList
          documents={documents}
          limit={5}
          order="desc"
        />

        <a href="/documents" className="see-more">
          Ver todos os documentos →
        </a>
      </section>

    </main>
  );
}