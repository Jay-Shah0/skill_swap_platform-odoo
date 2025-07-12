// app/api/auth/signup/route.ts
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
	await connectDB();

	const { name, email, password } = await req.json();

	const userExists = await User.findOne({ email });
	if (userExists) {
		return new Response(JSON.stringify({ error: "User already exists" }), {
			status: 400,
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	return new Response(JSON.stringify({ message: "User created" }), {
		status: 201,
	});
}
