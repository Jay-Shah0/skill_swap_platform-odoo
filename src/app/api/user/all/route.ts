import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await connectDB();
		const users = await User.find({ isPublic: true }).select("name email skillsOffered skillsWanted rating isPublic profilePic availability");

		return NextResponse.json({ users });
	} catch (err) {
		console.error("Failed to fetch users:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
