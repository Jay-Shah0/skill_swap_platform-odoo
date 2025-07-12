"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		const res = await fetch("/api/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});

		if (res.ok){
			// auto-login after signup
			await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			router.push("/");
		}
		else alert("Signup failed");
	};
	return (
		<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
			<div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md">
				<h1 className="text-xl font-bold mb-6">Create Your Account</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium">Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full px-4 py-2 rounded bg-gray-700 text-white mt-1"
							placeholder="Enter your name"
							required
						/>
					</div>
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
							placeholder="Create a password"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium">
							Confirm Password
						</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full px-4 py-2 rounded bg-gray-700 text-white mt-1"
							placeholder="Re-enter your password"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
					>
						<a href="/profile" className="underline">
                            Create Profile
                        </a>
					</button>
					<p className="text-sm text-center text-blue-400">
						Already have an account?{" "}
						<a href="/login" className="underline">
							Login here
						</a>
					</p>
				</form>
			</div>
		</div>
	);
}
