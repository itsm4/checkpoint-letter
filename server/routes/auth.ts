import { Router, Request, Response } from "express";
import { db } from "../config/db";
import { hashPassword, verifyPassword } from "../utils/password";
import jwt from "jsonwebtoken";

const router = Router();

// Route d'inscription
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer l'utilisateur
    const user = await db.one(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword],
    );

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "votre_clé_secrète",
      { expiresIn: "24h" },
    );

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route de connexion
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Récupérer l'utilisateur
    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "votre_clé_secrète",
      { expiresIn: "24h" },
    );

    res.json({
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router; 