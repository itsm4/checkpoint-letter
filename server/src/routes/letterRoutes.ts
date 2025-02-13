import express from "express";
import { letterController } from "../controllers/letterController";

const router = express.Router();

router.post("/letters", letterController.add);
router.get("/letters", letterController.browse);
router.get("/letters/:id", letterController.read);
router.put("/letters/:id", letterController.edit);
router.delete("/letters/:id", letterController.delete);

export default router; 