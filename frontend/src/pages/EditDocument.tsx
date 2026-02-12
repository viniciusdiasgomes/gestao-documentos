import "../styles/edit-document.css";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";
import { useEffect, useState } from "react";

export default function EditDocument() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/documents/${id}`);
        const data = await res.json();

        setTitle(data.title);
        setDescription(data.description ?? "");
      } catch {
        alert("Erro ao carregar documento");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, navigate]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);

      await fetch(`${API_URL}/documents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      navigate("/");
    } catch {
      alert("Erro ao salvar alterações");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p style={{ padding: 20 }}>Carregando...</p>;
  }

  return (
    <main className="edit-doc-page">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
         Voltar
      </button>

      <h2>Editar documento</h2>

      <form className="edit-doc-form" onSubmit={handleSave}>
        <label>
          Título
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />
        </label>

        <label>
          Descrição
          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </label>

        <div className="edit-actions">
          <button
            type="submit"
            disabled={saving}
            className="btn-save"
            onClick={() => navigate(-1)}
          >
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>

          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}
