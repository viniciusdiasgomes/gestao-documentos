import { useEffect, useState } from "react";

const API = "http://localhost:3333";

type DocumentItem = {
  id: number;
  title: string;
  created_at: string;
};

export default function App() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [status, setStatus] = useState<string>("");

  async function loadDocuments() {
    const res = await fetch(`${API}/documents`);
    const data: DocumentItem[] = await res.json();
    setDocuments(data);
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!file) {
      setStatus("Selecione um arquivo");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    const res = await fetch(`${API}/documents`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setStatus("Upload realizado com sucesso!");
      setTitle("");
      setDescription("");
      setFile(null);
      loadDocuments();
    } else {
      setStatus("Erro ao enviar documento");
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Gestão de Documentos</h1>

      <h2>Upload</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
          required
        />

        <button type="submit">Enviar</button>
      </form>

      <p>{status}</p>

      <h2>Documentos</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            {doc.title} —{" "}
            {new Date(doc.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
