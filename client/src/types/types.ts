// User related types
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  pseudo: string;
  email: string;
  created_at: string;
}

export interface UserInput {
  first_name: string;
  last_name: string;
  pseudo: string;
  email: string;
  password: string;
}

// Destinataire related types
export interface Destinataire {
  id: string;
  user_id: string;
  name: string;
  email: string;
}

export interface DestinaireInput {
  name: string;
  email: string;
}

// Template related types
export interface Template {
  id: string;
  name: string;
  preview_url: string | null;
}

// Font related types
export interface Font {
  id: string;
  name: string;
}

// Letter related types
export type LetterStatus = 'pending' | 'sent' | 'archived';

export interface Letter {
  id: string;
  user_id: string;
  destinataire_email: string;
  content: string;
  template_id: string | null;
  font: string | null;
  delivery_date: string;
  status: LetterStatus;
  created_at: string;
}

export interface LetterInput {
  destinataire_email: string;
  content: string;
  template_id?: string;
  font?: string;
  delivery_date: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 