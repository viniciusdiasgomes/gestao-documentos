export type DocumentItem = {
  id: number;
  title: string;
  description?: string | null;

  filename: string;        
  original_name: string;   

  created_at: string;
};