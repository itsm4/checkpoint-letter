import { useEffect, useState } from "react";

interface BaseLetter {
  id: string;
  title: string;
  content: string;
  writeDate: string;
  deliveryDate: string;
  status: "draft" | "scheduled";
  type: "for-you" | "future-me";
}

export const useLetters = (type: "for-you" | "future-me") => {
  const [letters, setLetters] = useState<BaseLetter[]>(() => {
    const saved = localStorage.getItem("letters");
    return saved ? JSON.parse(saved) : [];
  });

  const drafts = letters.filter(
    (letter) => letter.status === "draft" && letter.type === type,
  );

  const sentLetters = letters.filter(
    (letter) => letter.status === "scheduled" && letter.type === type,
  );

  const addLetter = (newLetter: Omit<BaseLetter, "id" | "writeDate">) => {
    const letterToAdd = {
      ...newLetter,
      id: Date.now().toString(),
      writeDate: new Date().toISOString(),
    };

    const updatedLetters = [...letters, letterToAdd];
    setLetters(updatedLetters);
    localStorage.setItem("letters", JSON.stringify(updatedLetters));
  };

  const saveDraft = (letter: {
    id?: string;
    title: string;
    content: string;
    deliveryDate: string;
    status: string;
  }) => {
    if (letter.id) {
      // Mise à jour d'une lettre existante
      const updatedLetters = letters.map((l) =>
        l.id === letter.id
          ? {
              ...l,
              title: letter.title,
              content: letter.content,
              deliveryDate: letter.deliveryDate,
              writeDate: new Date().toISOString(),
            }
          : l,
      );
      setLetters(updatedLetters);
      localStorage.setItem("letters", JSON.stringify(updatedLetters));
    } else {
      // Nouvelle lettre
      addLetter({ ...letter, status: "draft" });
    }
  };

  const sendLetter = (letter: BaseLetter) => {
    // S'assurer que le statut est "scheduled"
    const letterToAdd = {
      ...letter,
      status: "scheduled" as const,
      writeDate: new Date().toISOString(),
    };

    // Mettre à jour la liste des lettres
    const updatedLetters = [...letters, letterToAdd];
    setLetters(updatedLetters);

    // Sauvegarder dans le localStorage
    localStorage.setItem("letters", JSON.stringify(updatedLetters));
  };

  const updateLetter = (id: string, updates: Partial<BaseLetter>) => {
    const updatedLetters = letters.map((letter) =>
      letter.id === id ? { ...letter, ...updates } : letter,
    );
    setLetters(updatedLetters);
    localStorage.setItem("letters", JSON.stringify(updatedLetters));
  };

  const deleteLetter = (id: string) => {
    const updatedLetters = letters.filter((letter) => letter.id !== id);
    setLetters(updatedLetters);
    localStorage.setItem("letters", JSON.stringify(updatedLetters));
  };

  return {
    letters,
    saveDraft,
    sendLetter,
    updateLetter,
    deleteLetter,
    drafts,
    sentLetters,
  };
};
