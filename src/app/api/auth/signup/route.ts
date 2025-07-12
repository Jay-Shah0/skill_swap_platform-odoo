// app/api/auth/signup/route.ts
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
	try {
		const { name, email, password } = await req.json();
		await connectDB();

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return new Response(JSON.stringify({ message: "User already exists" }), {
				status: 400,
			});
		}

		const hashed = await bcrypt.hash(password, 10);
		const newUser = await User.create({ name, email, password: hashed });

		return new Response(JSON.stringify({ message: "User created" }), {
			status: 201,
		});
	} catch (error) {
		return new Response(JSON.stringify({ message: "Signup failed", error }), {
			status: 500,
		});
	}
}
