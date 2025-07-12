"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const res = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (res?.ok) router.push("/");
		else alert("Invalid credentials");
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
			<div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-xl font-bold">Skill Swap Platform</h1>
					<a
						href="/"
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
					>
						Home
					</a>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 rounded bg-gray-700 text-white mt-1"
							placeholder="Enter your email"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-2 rounded bg-gray-700 text-white mt-1"
							placeholder="Enter your password"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
					>
						Login
					</button>
					<div className="text-sm text-center text-blue-400 mt-2">
						<a href="#">Forgot username/password?</a>
					</div>
					<div className="text-sm text-center text-blue-400 mt-2">
						Don't have an account?{" "}
						<a href="/signup" className="underline">
							Sign Up
						</a>
					</div>
				</form>
			</div>
		</div>
	);
}
