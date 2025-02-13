import type { Request, RequestHandler, Response } from "express";
import Template from "../models/Template";

export const getAllTemplates: RequestHandler = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const templates = await Template.find(filter).sort({ createdAt: -1 });
    res.status(200).json(templates);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des templates" });
  }
};

export const getTemplateById: RequestHandler = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      res.status(404).json({ message: "Template non trouvé" });
      return;
    }
    res.status(200).json(template);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du template" });
  }
};

export const createTemplate: RequestHandler = async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du template" });
  }
};

export const updateTemplate: RequestHandler = async (req, res) => {
  res.status(200).json({});
};

export const deleteTemplate: RequestHandler = async (req, res) => {
  res.status(200).json({ message: "Supprimé" });
};
