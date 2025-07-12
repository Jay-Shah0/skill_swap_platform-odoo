"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function CreateSwapRequestPage() {
	const { data: session } = useSession();
	const searchParams = useSearchParams();
	const receiverEmail = searchParams.get("email");

	const [mode, setMode] = useState("light");
	const [mySkills, setMySkills] = useState<string[]>([]);
	const [theirSkills, setTheirSkills] = useState<string[]>([]);
	const [offeredSkill, setOfferedSkill] = useState("");
	const [wantedSkill, setWantedSkill] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		const fetchSkills = async () => {
			if (!session?.user?.email || !receiverEmail) return;

			try {
				const [myRes, theirRes] = await Promise.all([
					fetch(
						`/api/user/profile?email=${encodeURIComponent(session.user.email)}`
					),
					fetch(`/api/user/profile?email=${encodeURIComponent(receiverEmail)}`),
				]);

				const myData = await myRes.json();
				const theirData = await theirRes.json();

				setMySkills(myData.skillsOffered || []);
				setTheirSkills(theirData.skillsWanted || []);
			} catch (err) {
				console.error("Error loading skills", err);
			}
		};

		fetchSkills();
	}, [session, receiverEmail]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!session?.user?.email || !receiverEmail) return;

		try {
			const res = await fetch("/api/swap-request/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					requesterEmail: session.user.email,
					receiverEmail,
					offeredSkill,
					wantedSkill,
					message,
				}),
			});

			const result = await res.json();
			if (res.ok) {
				alert("Swap request submitted!");
			} else {
				alert("Failed to submit: " + result.error);
			}
		} catch (err) {
			console.error("Submission error:", err);
		}
	};

	return (
		<div className={`min-h-screen ${mode} p-6 transition-colors duration-300`}>
			<Navbar onLoginClick={() => {}} mode={mode} setMode={setMode} />
			<div className="flex flex-col items-center justify-center min-h-[80vh] mt-8">
				<form
					onSubmit={handleSubmit}
					className="bg-gray-900 dark:bg-gray-200 border-2 border-white dark:border-gray-900 rounded-2xl p-8 w-full max-w-md flex flex-col gap-6 shadow-lg"
				>
					<div>
						<label className="block mb-2 text-lg">Your Offered Skill</label>
						<select
							value={offeredSkill}
							onChange={(e) => setOfferedSkill(e.target.value)}
							required
							className="w-full bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 px-3 py-2 rounded-lg"
						>
							<option value="" disabled>
								Select a skill
							</option>
							{mySkills.map((skill) => (
								<option key={skill} value={skill}>
									{skill}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block mb-2 text-lg">Skill You Want</label>
						<select
							value={wantedSkill}
							onChange={(e) => setWantedSkill(e.target.value)}
							required
							className="w-full bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 px-3 py-2 rounded-lg"
						>
							<option value="" disabled>
								Select a skill
							</option>
							{theirSkills.map((skill) => (
								<option key={skill} value={skill}>
									{skill}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block mb-2 text-lg">Message</label>
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="w-full bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 px-3 py-2 rounded-lg min-h-[100px]"
							placeholder="Write a message..."
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
					>
						Submit Request
					</button>
				</form>
			</div>
		</div>
	);
}
