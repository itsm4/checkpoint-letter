import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import letterRoutes from "./routes/letterRoutes";
import logger from "./utils/logger";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api", letterRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
