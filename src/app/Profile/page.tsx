"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UserProfile() {
	const [form, setForm] = useState({
		location: "",
		availability: "",
		isPublic: true,
		skillsOffered: "",
		skillsWanted: "",
		profilePic: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // ✅ fallback
	});

	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const stored = localStorage.getItem("userProfile");
		if (stored) {
			const parsed = JSON.parse(stored);
			setForm({
				location: parsed.location || "",
				availability: parsed.availability || "",
				isPublic: parsed.isPublic ?? true,
				skillsOffered: (parsed.skillsOffered || []).join(", "),
				skillsWanted: (parsed.skillsWanted || []).join(", "),
				profilePic:
					parsed.profilePic ||
					"https://cdn-icons-png.flaticon.com/512/149/149071.png",
			});
		}
	}, []);

	const handleChange = (e: any) => {
		const { name, value, type, checked } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSave = async () => {
		// Validate required fields
		if (
			!form.location ||
			!form.availability ||
			!form.skillsOffered ||
			!form.skillsWanted
		) {
			alert("Please fill in all required fields.");
			return;
		}

		setLoading(true);
		const res = await fetch("/api/user/update", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: form.location,
				availability: form.availability,
				isPublic: form.isPublic,
				skillsOffered: form.skillsOffered.split(",").map((s) => s.trim()),
				skillsWanted: form.skillsWanted.split(",").map((s) => s.trim()),
				profilePic: form.profilePic,
			}),
		});

		if (res.ok) {
			alert("Profile updated!");
			router.push("/");
		} else {
			alert("Failed to update");
		}
		setLoading(false);
	};

	return (
		<div className="min-h-screen bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 p-6">
			<div className="flex justify-between items-center mb-4">
				<div className="flex gap-4 items-center">
					<h1 className="text-xl font-bold">Skill Swap Platform</h1>
					<a href="/swap-requests" className="underline">
						Swap Request
					</a>
				</div>
				<a
					href="/"
					className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 text-white dark:text-gray-900 px-4 py-2 rounded"
				>
					Home
				</a>
			</div>

			<div className="bg-gray-800 dark:bg-gray-200 p-6 rounded">
				<div className="flex justify-between">
					<div className="w-full max-w-lg">
						<h2 className="text-lg font-bold mb-4">Create Your Profile</h2>

						<div className="mb-4">
							<label>Location *</label>
							<input
								name="location"
								value={form.location}
								onChange={handleChange}
								className="block w-full bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900 p-2 rounded mt-1"
								required
							/>
						</div>

						<div className="mb-4">
							<label>Skills Offered *</label>
							<input
								name="skillsOffered"
								value={form.skillsOffered}
								onChange={handleChange}
								className="block w-full bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900 p-2 rounded mt-1"
								required
								placeholder="e.g. Python, JavaScript"
							/>
						</div>

						<div className="mb-4">
							<label>Skills Wanted *</label>
							<input
								name="skillsWanted"
								value={form.skillsWanted}
								onChange={handleChange}
								className="block w-full bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900 p-2 rounded mt-1"
								required
								placeholder="e.g. Design, Photoshop"
							/>
						</div>

						<div className="mb-4">
							<label>Availability *</label>
							<input
								name="availability"
								value={form.availability}
								onChange={handleChange}
								className="block w-full bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900 p-2 rounded mt-1"
								required
								placeholder="e.g. Weekends"
							/>
						</div>

						<div className="mb-4">
							<label>Profile Visibility</label>
							<select
								name="isPublic"
								value={form.isPublic ? "Public" : "Private"}
								onChange={(e) =>
									setForm((prev) => ({
										...prev,
										isPublic: e.target.value === "Public",
									}))
								}
								className="block w-full bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900 p-2 rounded mt-1"
							>
								<option>Public</option>
								<option>Private</option>
							</select>
						</div>
					</div>

					<div className="text-center">
						<div className="w-28 h-28 rounded-full bg-gray-600 dark:bg-gray-400 mx-auto mb-2 overflow-hidden">
							<Image
								src={
									form.profilePic ||
									"https://cdn-icons-png.flaticon.com/512/149/149071.png"
								}
								alt="Profile Photo"
								width={112}
								height={112}
								className="rounded-full object-cover w-28 h-28"
							/>
						</div>
					</div>
				</div>

				<div className="mt-6 flex gap-4">
					<button
						onClick={handleSave}
						disabled={loading}
						className="bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 text-white dark:text-gray-900 px-4 py-2 rounded"
					>
						{loading ? "Saving..." : "Save"}
					</button>
					<button className="text-red-500 dark:text-red-600">Discard</button>
				</div>
			</div>
		</div>
	);
}
