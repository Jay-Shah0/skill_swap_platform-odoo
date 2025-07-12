// ✅ src/models/User.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	location: { type: String },
	availability: { type: String, enum: ["weekends", "evenings", "anytime"] },
	isPublic: { type: Boolean, default: true },
	skillsOffered: { type: [String], default: [] },
	skillsWanted: { type: [String], default: [] },
	profilePic: {
		type: String,
		default: "https://www.gravatar.com/avatar/?d=mp",
	},
	rating: { type: Number, default: null }, // ✅ Added rating
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
