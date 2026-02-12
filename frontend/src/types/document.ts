export type DocumentItem = {
  id: number;
  title: string;
  description?: string | null;
  comments_count?: number; 

  filename: string;        
  original_name: string;   

  created_at: string;
};