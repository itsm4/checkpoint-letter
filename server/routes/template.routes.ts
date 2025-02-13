import express from "express";
import type { Router } from "express";
import {
  createTemplate,
  deleteTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
} from "../controllers/template.controller";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

// Routes publiques
router.get("/templates", getAllTemplates);
router.get("/templates/:id", getTemplateById);

// Routes protégées (nécessitent une authentification)
router.post("/templates", auth, createTemplate);
router.put("/templates/:id", auth, updateTemplate);
router.delete("/templates/:id", auth, deleteTemplate);

export default router;
