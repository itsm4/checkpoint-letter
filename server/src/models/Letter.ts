import mongoose from "mongoose";

const letterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipient", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  writeDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ["draft", "scheduled", "delivered"],
    default: "draft"
  },
});

export default mongoose.model("Letter", letterSchema); 