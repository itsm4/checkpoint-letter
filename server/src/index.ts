import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";

const app = express();

// Configuration CORS plus permissive pour le développement
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // URLs du client Vite
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Connexion MongoDB
mongoose.connect("mongodb://localhost:27017/your_database")
  .then(() => {
    console.log("Connecté à MongoDB");
    // Démarrer le serveur seulement après la connexion à MongoDB
    app.listen(3000, () => {
      console.log("Serveur démarré sur http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Erreur de connexion MongoDB:", err);
    process.exit(1);
  });

// Gestion des erreurs globale
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Une erreur est survenue sur le serveur",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
}); 