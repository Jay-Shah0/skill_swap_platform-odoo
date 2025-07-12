import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  availability: { type: String, enum: ["weekends", "evenings", "anytime"] },
  isPublic: { type: Boolean, default: true },
  skillsOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  skillsWanted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
