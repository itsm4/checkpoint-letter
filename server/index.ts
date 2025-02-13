import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import templateRoutes from "./routes/template.routes";

dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", templateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 