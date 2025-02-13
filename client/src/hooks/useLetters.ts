import { useState } from "react";

interface Letter {
  id: string;
  title: string;
  content: string;
  writeDate: string;
  deliveryDate: string;
  status: "draft" | "scheduled";
}

export const useLetters = () => {
  const [letters, setLetters] = useState<Letter[]>(() => {
    const saved = localStorage.getItem("letters");
    return saved ? JSON.parse(saved) : [];
  });

  const addLetter = (newLetter: Omit<Letter, "id" | "writeDate">) => {
    const letterToAdd = {
      ...newLetter,
      id: Date.now().toString(),
      writeDate: new Date().toISOString(),
    };
    
    const updatedLetters = [...letters, letterToAdd];
    setLetters(updatedLetters);
    localStorage.setItem("letters", JSON.stringify(updatedLetters));
  };

  const saveDraft = (letter: { id?: string; title: string; content: string; deliveryDate: string; status: string }) => {
    if (letter.id) {
      // Mise à jour d'une lettre existante
      const updatedLetters = letters.map(l => 
        l.id === letter.id 
          ? { 
              ...l, 
              title: letter.title,
              content: letter.content,
              deliveryDate: letter.deliveryDate,
              writeDate: new Date().toISOString()
            } 
          : l
      );
      setLetters(updatedLetters);
      localStorage.setItem("letters", JSON.stringify(updatedLetters));
    } else {
      // Nouvelle lettre
      addLetter({ ...letter, status: "draft" });
    }
  };

  const sendLetter = (letter: Letter) => {
    // S'assurer que le statut est "scheduled"
    const letterToAdd = {
      ...letter,
      status: "scheduled" as const,
      writeDate: new Date().toISOString()
    };
    
    const updatedLetters = [...letters, letterToAdd];
    setLetters(updatedLetters);
    localStorage.setItem("letters", JSON.stringify(updatedLetters));
  };

  const updateLetter = (id: string, updates: Partial<Letter>) => {
    const updatedLetters = letters.map(letter => 
      letter.id === id ? { ...letter, ...updates } : letter
    );
    setLetters(updatedLetters);
    localStorage.setItem("letters", JSON.stringify(updatedLetters));
  };

  const deleteLetter = (id: string) => {
    const updatedLetters = letters.filter(letter => letter.id !== id);
    setLetters(updatedLetters);
    localStorage.setItem("letters", JSON.stringify(updatedLetters));
  };

  return { 
    letters,
    saveDraft,
    sendLetter,
    updateLetter,
    deleteLetter,
    drafts: letters.filter(l => l.status === "draft"),
    sentLetters: letters.filter(l => l.status === "scheduled")
  };
}; 