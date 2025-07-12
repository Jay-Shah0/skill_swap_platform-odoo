import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const token = await getToken({ req });

		if (!token?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await connectDB();
		const user = await User.findOne({ email: token.email });

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json({
			id: user._id,
			name: user.name,
			email: user.email,
			location: user.location,
			availability: user.availability,
			isPublic: user.isPublic,
			skillsOffered: user.skillsOffered,
			skillsWanted: user.skillsWanted,
			profilePic: user.profilePic,
			createdAt: user.createdAt,
		});
	} catch (err) {
		console.error("Profile fetch error:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
