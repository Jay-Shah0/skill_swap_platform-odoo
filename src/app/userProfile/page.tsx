"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function UserProfile() {
	const searchParams = useSearchParams();
	const email = searchParams.get("email");

	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch(
					`/api/user/by-email?email=${encodeURIComponent(email || "")}`
				);
				const data = await res.json();
				if (res.ok) {
					setUser(data.user);
				} else {
					console.error("Failed to fetch user profile", data.error);
				}
			} catch (err) {
				console.error("Error fetching user profile", err);
			} finally {
				setLoading(false);
			}
		};

		if (email) fetchUser();
	}, [email]);

	if (loading)
		return <div className="text-center p-10 text-xl">Loading...</div>;
	if (!user)
		return <div className="text-center p-10 text-xl">User not found</div>;

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="w-full max-w-5xl h-full flex flex-row items-center justify-between px-12 py-16 gap-12">
				{/* Left: Info */}
				<div className="flex-1 flex flex-col justify-center items-start h-full pr-8">
					<h2 className="text-4xl font-bold text-blue-900 dark:text-blue-200 mb-4">
						{user.name}
					</h2>
					<p className="text-xl text-gray-700 dark:text-gray-300 mb-4 font-semibold">
						{user.location || "Unknown Location"}
					</p>

					<p className="text-sm italic text-gray-500 dark:text-gray-400 mb-6">
						Availability: {user.availability || "Not Specified"}
					</p>

					<div className="mb-4 w-full">
						<span className="block text-green-600 dark:text-green-400 font-bold mb-2">
							Skills Offered:
						</span>
						<div className="flex flex-wrap gap-2">
							{user.skillsOffered?.map((skill: string, idx: number) => (
								<span
									key={idx}
									className="px-3 py-1 rounded-xl border border-green-400 bg-white dark:bg-gray-800 text-green-700 dark:text-green-200 font-medium text-base"
								>
									{skill}
								</span>
							))}
						</div>
					</div>

					<div className="mb-4 w-full">
						<span className="block text-blue-600 dark:text-blue-400 font-bold mb-2">
							Skills Wanted:
						</span>
						<div className="flex flex-wrap gap-2">
							{user.skillsWanted?.map((skill: string, idx: number) => (
								<span
									key={idx}
									className="px-3 py-1 rounded-xl border border-blue-400 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-200 font-medium text-base"
								>
									{skill}
								</span>
							))}
						</div>
					</div>

					<div className="mb-4 w-full">
						<span className="block text-purple-600 dark:text-purple-400 font-bold mb-2">
							Remarks:
						</span>
						<p className="bg-white dark:bg-gray-800 rounded-xl p-3 text-purple-700 dark:text-purple-200 text-base">
							{user.remarks || "No remarks provided."}
						</p>
					</div>

					<div className="w-full flex gap-8 items-center mb-8">
						<span className="text-yellow-600 dark:text-yellow-400 font-bold text-lg">
							Rating: {user.rating !== null ? `${user.rating}/5` : "-"}
						</span>
					</div>

					<a
						href={`/swap-requests?email=${encodeURIComponent(user.email)}`}
						className="w-full"
					>
						<button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow text-lg transition-all duration-200">
							Request
						</button>
					</a>
				</div>

				{/* Right: Profile Pic */}
				<div className="flex-1 flex justify-end items-center h-full pl-8">
					<img
						src={user.profilePic || "https://www.gravatar.com/avatar/?d=mp"}
						alt="Profile"
						className="w-64 h-64 rounded-full object-cover border-4 border-blue-400 shadow-lg"
					/>
				</div>
			</div>
		</div>
	);
}
