import "../styles/home.css";
import { ActionCard } from "../components/ActionCard";
import { DocumentList } from "../components/DocumentList";
import { useDocuments } from "../hooks/useDocuments";

export default function Home() {
  const { documents } = useDocuments();

  return (
    <main className="home-container">
      {/* APRESENTAÇÃO */}
      <section className="home-intro">
        <h2>Sistema de Gestão de Documentos</h2>
        <p>
          Centralize uploads, organização e comentários em um ambiente
          seguro e profissional.
        </p>
      </section>

      {/* AÇÕES PRINCIPAIS */}
      <section className="home-actions">
        <ActionCard
          title="Ver documentos"
          description="Acesse todos os documentos cadastrados"
          to="/documents"
        />

        <ActionCard
          title="Enviar documentos"
          description="Faça upload de novos arquivos"
          to="/upload"
        />
      </section>

      {/* ÚLTIMOS DOCUMENTOS */}
      <section className="home-last">
        <h3>Últimos documentos enviados</h3>

        {documents.length > 0 ? (
          <DocumentList documents={documents.slice(0, 4)} />
        ) : (
          <p className="empty-text">
            Nenhum documento foi enviado ainda.
          </p>
        )}
      </section>
    </main>
  );
}
