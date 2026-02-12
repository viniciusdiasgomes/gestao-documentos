import { useEffect, useState } from "react";
import { API_URL } from "../services/api";
import type { DocumentItem } from "../types/document";

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadDocuments() {
    setLoading(true);
    const res = await fetch(`${API_URL}/documents`);
    const data = await res.json();
    setDocuments(data);
    setLoading(false);
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  return { documents, loading, reload: loadDocuments };
}