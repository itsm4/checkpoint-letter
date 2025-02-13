import type React from "react";
import type { Template } from "../services/templateService";

interface TemplateSelectorProps {
  selectedTemplate?: Template;
  onSelect: (template: Template) => void;
  onClose: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelect,
  onClose,
}) => {
  return (
    <div className="template-selector-overlay">
      <div className="template-selector-content">
        <button type="button" className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="template-preview">
          {selectedTemplate && (
            <>
              <img
                src={selectedTemplate.imageUrl}
                alt={selectedTemplate.name}
              />
              <div className="template-details">
                <h2>{selectedTemplate.name}</h2>
                <p>Style: {selectedTemplate.category}</p>
                <button
                  type="button"
                  className="use-template-button"
                  onClick={() => onSelect(selectedTemplate)}
                >
                  Utiliser ce template
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
