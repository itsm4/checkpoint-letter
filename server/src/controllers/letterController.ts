import { Request, Response } from "express";
import Letter from "../models/Letter";

export const letterController = {
  // Browse - Liste toutes les lettres
  browse: async (req: Request, res: Response) => {
    try {
      const letters = await Letter.find({ userId: req.user.id });
      res.json(letters);
    } catch (error) {
      res.status(500).json({ message: "Error fetching letters" });
    }
  },

  // Read - Lit une lettre spécifique
  read: async (req: Request, res: Response) => {
    try {
      const letter = await Letter.findOne({ 
        _id: req.params.id,
        userId: req.user.id 
      });
      if (!letter) return res.status(404).json({ message: "Letter not found" });
      res.json(letter);
    } catch (error) {
      res.status(500).json({ message: "Error fetching letter" });
    }
  },

  // Edit - Modifie une lettre
  edit: async (req: Request, res: Response) => {
    try {
      const letter = await Letter.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true }
      );
      if (!letter) return res.status(404).json({ message: "Letter not found" });
      res.json(letter);
    } catch (error) {
      res.status(500).json({ message: "Error updating letter" });
    }
  },

  // Add - Crée une nouvelle lettre
  add: async (req: Request, res: Response) => {
    try {
      const letter = new Letter({
        ...req.body,
        userId: req.user.id
      });
      await letter.save();
      res.status(201).json(letter);
    } catch (error) {
      res.status(500).json({ message: "Error creating letter" });
    }
  },

  // Delete - Supprime une lettre
  delete: async (req: Request, res: Response) => {
    try {
      const letter = await Letter.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id
      });
      if (!letter) return res.status(404).json({ message: "Letter not found" });
      res.json({ message: "Letter deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting letter" });
    }
  }
}; 