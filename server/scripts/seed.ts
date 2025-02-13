import mongoose from "mongoose";
import Template from "../models/Template";
import dotenv from "dotenv";

dotenv.config();

const templates = [
  {
    name: "Template Vintage 1",
    imageUrl: "/templates/vintage1.jpg",
    category: "vintage"
  },
  {
    name: "Template Modern 1",
    imageUrl: "/templates/modern1.jpg",
    category: "modern"
  }
  // Ajoutez d'autres templates...
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    await Template.deleteMany({});
    await Template.insertMany(templates);
    console.log("Base de données initialisée !");
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB(); 