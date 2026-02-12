import { useState } from "react";
import { API_URL } from "../services/api";

type Props = {
  onSuccess: () => void;
};

export function UploadForm({ onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    const res = await fetch(`${API_URL}/documents`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setStatus("Upload realizado com sucesso!");
      setTitle("");
      setDescription("");
      setFile(null);
      onSuccess();
    } else {
      setStatus("Erro ao enviar documento");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
      <button type="submit">Enviar</button>
      <p>{status}</p>
    </form>
  );
}
