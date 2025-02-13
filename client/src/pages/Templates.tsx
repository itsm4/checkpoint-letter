import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { type Template, templateService } from "../services/templateService";
import "../styles/Templates.css";

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const loadTemplates = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await templateService.getAllTemplates(selectedCategory);
      setTemplates(data);
    } catch (err) {
      setError("Erreur lors du chargement des templates");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="templates-container">
      <div className="templates-header">
        <h1>Choisissez votre template</h1>
        <div className="category-filters">
          <button
            type="button"
            className={!selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory("")}
          >
            Tous
          </button>
          {["vintage", "modern", "romantic", "formal"].map((category) => (
            <button
              type="button"
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="templates-grid">
        {isLoading ? (
          <div className="loading">Chargement...</div>
        ) : (
          templates.map((template) => (
            <div key={template._id} className="template-card">
              <div className="template-image">
                <img src={template.imageUrl} alt={template.name} />
              </div>
              <div className="template-info">
                <h3>{template.name}</h3>
                <span className="template-category">{template.category}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Templates;
