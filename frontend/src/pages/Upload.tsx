import { UploadForm } from "../components/UploadForm";
import { useNavigate } from "react-router-dom";
import "../styles/upload.css";

export default function Upload() {
  const navigate = useNavigate();

  return (
    <main className="upload-container">
      {/* VOLTAR */}
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
         Voltar
      </button>

      {/* TÍTULO */}
      <section className="upload-header">
        <h2>Enviar documento</h2>
        <p>
          Faça o upload de documentos em PDF, JPG ou PNG.
          Os arquivos ficarão disponíveis na Central de Documentos.
        </p>
      </section>

      {/* FORMULÁRIO */}
      <section className="upload-form-wrapper">
        <UploadForm onSuccess={() => navigate("/documents")} />
      </section>
    </main>
  );
}
