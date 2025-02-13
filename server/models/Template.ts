import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["vintage", "modern", "romantic", "formal"],
    default: "vintage",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Template", templateSchema);
