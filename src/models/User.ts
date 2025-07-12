import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	location: { type: String },
	availability: { type: String, enum: ["weekends", "evenings", "anytime"] },
	isPublic: { type: Boolean, default: true },
	skillsOffered: { type: [String], default: [] }, // changed to array of strings
	skillsWanted: { type: [String], default: [] }, // changed to array of strings
	profilePic: {
		type: String,
		default: "https://i.ibb.co/8XvXt0t/default-avatar.png",
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
