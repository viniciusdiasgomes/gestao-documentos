import { useState } from "react";
import "../styles/upload.css";
import { API_URL } from "../services/api";

type Props = {
  onSuccess: () => void;
};

export function UploadForm({ onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(selected.type)) {
      setError("Formato inválido. Envie apenas PDF, JPG ou PNG.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selected);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !file) {
      setError("Título e arquivo são obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      
      const res = await fetch(`${API_URL}/documents`, {
        method: "POST",
        body: formData,
      });

if (!res.ok) {
  throw new Error("Erro ao criar documento");
}

const data = await res.json(); // ← pega o ID
const documentId = data.id;

/* SE tiver comentário, cria */
if (comment.trim()) {
  await fetch(
    `http://localhost:3333/documents/${documentId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: comment,
      }),
    }
  );
}

onSuccess();
    } catch {
      setError("Erro ao enviar documento.");
    }
  }

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      {error && <p className="error-text">{error}</p>}

      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          placeholder="Ex: Contrato de prestação de serviços"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Descrição (opcional)</label>
        <textarea
          placeholder="Informações adicionais sobre o documento"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>


    <div className="form-group">
  <label>Comentário inicial (opcional)</label>
  <textarea
    placeholder="Ex: Documento enviado para análise jurídica"
    value={comment}
    onChange={(e) => setComment(e.target.value)}
  />
</div>
      {/* INPUT DE ARQUIVO ESTILIZADO */}
      <div className="form-group">
        <label>Arquivo</label>

        <label className="file-upload">
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            hidden
          />
          <span>
            {file ? file.name : "Selecionar arquivo"}
          </span>
        </label>

        <small>Formatos permitidos: PDF, JPG, PNG</small>
      </div>

      <button type="submit" className="submit-button">
        Enviar documento
      </button>
    </form>
  );
}