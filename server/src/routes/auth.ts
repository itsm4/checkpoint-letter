import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = express.Router();

// Route d'inscription
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: "Tous les champs sont requis" 
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: "Cet email ou ce pseudo est déjà utilisé" 
      });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel utilisateur
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Créer le token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "votre_secret",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    res.status(500).json({ 
      message: "Erreur lors de l'inscription" 
    });
  }
});

// Route de connexion
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        message: "Email ou mot de passe incorrect" 
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ 
        message: "Email ou mot de passe incorrect" 
      });
    }

    // Générer le token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "votre_secret",
      { expiresIn: "24h" }
    );

    // Envoyer la réponse avec le token et les infos utilisateur
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Erreur lors de la connexion" 
    });
  }
});

export default router; 