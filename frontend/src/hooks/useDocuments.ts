import { useEffect, useState } from "react";
import { API_URL } from "../services/api";
import type { DocumentItem } from "../types/document";

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadDocuments() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/documents`);

      if (!res.ok) {
        throw new Error("Erro ao buscar documentos");
      }

      const data: DocumentItem[] = await res.json();
      setDocuments(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os documentos.");
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    reload: loadDocuments,
  };
}