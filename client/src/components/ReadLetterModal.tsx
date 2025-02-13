import React, { useEffect } from "react";
import "../styles/ReadLetterModal.css";

interface ReadLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  letter: {
    title: string;
    content: string;
    writeDate: string;
    deliveryDate: string;
  };
}

const ReadLetterModal: React.FC<ReadLetterModalProps> = ({
  isOpen,
  onClose,
  letter,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="read-modal-overlay" onClick={handleOverlayClick}>
      <div 
        className="read-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="letter-container">
          <h2>{letter.title}</h2>
          <div className="letter-dates">
            <p>Écrit le: {new Date(letter.writeDate).toLocaleDateString()}</p>
            <p>À ouvrir le: {new Date(letter.deliveryDate).toLocaleDateString()}</p>
          </div>
          <div className="letter-body">
            {letter.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadLetterModal; 