import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  offeredSkill: { type: String, required: true },
  wantedSkill: { type: String, required: true },
  avgrating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Skill || mongoose.model("Skill", skillSchema);
