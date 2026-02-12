export type DocumentItem = {
  id: number;
  title: string;
  description?: string | null;
  file: string;
  created_at: string;
};