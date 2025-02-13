import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310/api";

export interface Template {
  _id: string;
  name: string;
  imageUrl: string;
  category: 'vintage' | 'modern' | 'romantic' | 'formal';
}

export const templateService = {
  getAllTemplates: async (category?: string) => {
    try {
      const response = await axios.get<Template[]>(`${API_URL}/templates`, {
        params: { category }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des templates:", error);
      throw error;
    }
  },

  getTemplateById: async (id: string) => {
    try {
      const response = await axios.get<Template>(`${API_URL}/templates/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération du template:", error);
      throw error;
    }
  },

  createTemplate: async (formData: FormData) => {
    const response = await axios.post<Template>(`${API_URL}/templates`, formData);
    return response.data;
  }
}; 