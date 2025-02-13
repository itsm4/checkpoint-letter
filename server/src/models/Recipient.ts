import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  initial: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Recipient", recipientSchema); 