import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import SwapRequest from "@/models/SwapRequest";

export async function POST(req: NextRequest) {
	try {
		await connectDB();
		const {
			requesterEmail,
			receiverEmail,
			offeredSkill,
			wantedSkill,
			message,
		} = await req.json();

		const requester = await User.findOne({ email: requesterEmail });
		const receiver = await User.findOne({ email: receiverEmail });

		if (!requester || !receiver) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const newRequest = await SwapRequest.create({
			requester: requester._id,
			receiver: receiver._id,
			offeredSkill,
			wantedSkill,
			message,
		});

		return NextResponse.json({ success: true, requestId: newRequest._id });
	} catch (err) {
		console.error("Error creating swap request", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
