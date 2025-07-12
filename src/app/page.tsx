// pages/index.tsx
"use client";
import { useEffect, useState } from "react";

// components
import Navbar from "../components/Navbar";
import SkillCard from "../components/SkillCard";
import Pagination from "../components/Pagination";
import LoginModal from "../components/LoginModal";

const dummyProfiles = [
	{
		name: "Marc Demo",
		skillsOffered: ["JavaScript", "Python"],
		skillsWanted: ["Backend developer"],
		rating: 3.9,
		isPublic: true,
		photoUrl: "/avatar1.jpeg",
		availability: "Weekends",
	},
	{
		name: "Michell",
		skillsOffered: ["JavaScript"],
		skillsWanted: ["Graphic designer"],
		rating: 2.5,
		isPublic: true,
		photoUrl: "/avatar1.jpeg",
		availability: "Weekends",
	},
	{
		name: "Joe Wills",
		skillsOffered: ["Linux"],
		skillsWanted: ["Frontend developer"],
		rating: 4.0,
		isPublic: true,
		photoUrl: "/avatar1.jpeg",
		availability: "Weekends",
	},
];

export default function Home() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [search, setSearch] = useState("");
	const [mode, setMode] = useState(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("mode") || "light";
		}
		return "light";
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("mode", mode);
			document.documentElement.classList.remove("dark", "light");
			document.documentElement.classList.add(mode);
		}
	}, [mode]);

	const filteredProfiles = dummyProfiles.filter(
		(profile) =>
			profile.isPublic &&
			profile.skillsWanted.some((skill) =>
				skill.toLowerCase().includes(search.toLowerCase())
			)
	);

	return (
		<div className={`min-h-screen ${mode} transition-colors duration-300`}>
			<Navbar
				onLoginClick={() => setShowModal(true)}
				mode={mode}
				setMode={setMode}
			/>
			<div className="max-w-4xl mx-auto py-8 px-4">
				<div className="flex items-center gap-4 mb-6">
					<select className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 px-3 py-2 rounded">
						<option>Availability</option>
						<option>Weekends</option>
						<option>Evenings</option>
					</select>
					<input
						type="text"
						placeholder="Search skills..."
						className="flex-1 bg-gray-800 dark:bg-gray-200 px-4 py-2 rounded text-white dark:text-gray-900"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 px-4 py-2 rounded text-white dark:text-gray-900">
						Search
					</button>
				</div>
				<div className="space-y-4">
					{filteredProfiles.map((profile, idx) => (
						<SkillCard
							key={idx}
							profile={profile}
							isLoggedIn={isLoggedIn}
							onRequest={() => {
								if (!isLoggedIn) setShowModal(true);
							}}
						/>
					))}
				</div>
				<Pagination totalPages={7} currentPage={1} />
			</div>
			<LoginModal isOpen={showModal} onClose={() => setShowModal(false)} />
		</div>
	);
}
