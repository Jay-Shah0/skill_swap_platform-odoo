// src/app/api/user/update/route.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function PATCH(req: Request) {
	try {
		const token = await getToken({ req });

		if (!token || !token.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		await connectDB();

		const updatedUser = await User.findOneAndUpdate(
			{ email: token.email },
			{
				$set: {
					location: body.location,
					availability: body.availability,
					isPublic: body.isPublic,
					skillsOffered: body.skillsOffered || [],
					skillsWanted: body.skillsWanted || [],
					profilePic: body.profilePic,
				},
			},
			{ new: true }
		);

		if (!updatedUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, user: updatedUser });
	} catch (err) {
		console.error("Update error:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
