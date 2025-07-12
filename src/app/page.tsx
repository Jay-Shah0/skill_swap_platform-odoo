// pages/index.tsx
"use client";
import { useEffect, useState } from "react";

// components
import Navbar from "../components/Navbar";
import SkillCard from "../components/SkillCard";
import Pagination from "../components/Pagination";
import LoginModal from "../components/LoginModal";
import { useSession } from "next-auth/react";

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
	{
		name: "Anna Smith",
		skillsOffered: ["React", "Node.js"],
		skillsWanted: ["UI/UX designer"],
		rating: 4.5,
		isPublic: true,
		photoUrl: "/avatar1.jpeg",
		availability: "Evenings",
	},
	{
		name: "John Doe",
		skillsOffered: ["C++", "Java"],
		skillsWanted: ["Project manager"],
		rating: 3.2,
		isPublic: true,
		photoUrl: "/avatar1.jpeg",
		availability: "Weekends",
	},
	{
		name: "Emily Clark",
		skillsOffered: ["Go", "Rust"],
		skillsWanted: ["DevOps"],
		rating: 4.8,
		isPublic: true,
		photoUrl: "/avatar1.jpeg",
		availability: "Evenings",
	},
	{
		name: "Michael Lee",
		skillsOffered: ["PHP", "Laravel"],
		skillsWanted: ["SEO specialist"],
		rating: 3.7,
		isPublic: true,
		photoUrl: "/avatar1.jpeg",
		availability: "Weekends",
	},
	{
		name: "Sara Kim",
		skillsOffered: ["Swift", "iOS"],
		skillsWanted: ["Android developer"],
		rating: 4.1,
		isPublic: true,
		photoUrl: "/avatar1.jpeg",
		availability: "Evenings",
	},
];

export default function Home() {
	const { data: session, status } = useSession();
	const isLoggedIn = !!session;
	const [showModal, setShowModal] = useState(false);
	const [search, setSearch] = useState("");
	const [mode, setMode] = useState(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("mode") || "light";
		}
		return "light";
	});
	const [availability, setAvailability] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const profilesPerPage = 5;

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
			) &&
			(availability === "" || profile.availability === availability)
	);

	const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);
	const paginatedProfiles = filteredProfiles.slice(
		(currentPage - 1) * profilesPerPage,
		currentPage * profilesPerPage
	);

	return (
		<div className={`min-h-screen ${mode} transition-colors duration-300`}>
			<Navbar
				onLoginClick={() => setShowModal(true)}
				mode={mode}
				setMode={setMode}
			/>
			{/* Landing Section */}
			<div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100">
				{/* Animated Dotted Lines SVG */}
				<svg
					className="absolute top-0 left-0 w-full h-full z-0"
					viewBox="0 0 1440 800"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					{/* Example coordinates for boxes, adjust as needed for your layout */}
					<circle
						cx="200"
						cy="200"
						r="120"
						fill="#a5b4fc"
						fillOpacity="0.3"
					/>
					<circle
						cx="1240"
						cy="600"
						r="100"
						fill="#fca5a5"
						fillOpacity="0.3"
					/>
					<rect
						x="600"
						y="100"
						width="200"
						height="200"
						rx="40"
						fill="#fcd34d"
						fillOpacity="0.2"
					/>
					<ellipse
						cx="900"
						cy="300"
						rx="80"
						ry="40"
						fill="#6ee7b7"
						fillOpacity="0.2"
					/>
					{/* Dotted lines connecting boxes */}
					<polyline
						points="520,320 720,320 720,480 920,480 920,640"
						stroke="#6366f1"
						strokeWidth="4"
						strokeDasharray="10,10"
						fill="none"
						className="animate-draw"
						markerEnd="url(#arrowhead)"
					/>
					{/* Arrowhead marker */}
					<defs>
						<marker
							id="arrowhead"
							markerWidth="10"
							markerHeight="10"
							refX="5"
							refY="5"
							orient="auto"
							markerUnits="strokeWidth"
						>
							<path
								d="M0,0 L10,5 L0,10 L3,5 Z"
								fill="#6366f1"
							/>
						</marker>
					</defs>
				</svg>
				{/* Center Title */}
				<h1 className="z-10 text-5xl md:text-7xl font-extrabold text-center text-blue-900 drop-shadow-lg mb-12">
					Skill Swap Platform
				</h1>
				{/* Four Boxes */}
				<div className="z-10 absolute inset-0 flex justify-center items-center pointer-events-none">
					<div className="grid grid-cols-2 grid-rows-2 gap-16 w-full h-full max-w-3xl mx-auto">
						<div className="flex justify-center items-center">
							<div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-6 text-lg font-semibold text-blue-700 w-40 h-32 flex items-center justify-center">
								Show Your Skills
							</div>
						</div>
						<div className="flex justify-center items-center">
							<div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-6 text-lg font-semibold text-purple-700 w-40 h-32 flex items-center justify-center">
								Find the Skills
							</div>
						</div>
						<div className="flex justify-center items-center">
							<div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-6 text-lg font-semibold text-pink-700 w-40 h-32 flex items-center justify-center">
								Recruit the Skill
							</div>
						</div>
						<div className="flex justify-center items-center relative">
							<div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-6 text-lg font-semibold text-green-700 w-40 h-32 flex items-center justify-center">
								Start Progress
							</div>
							{/* LETS GO text at the end of the last line */}
							<span className="absolute bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 text-xl font-bold text-blue-600">
								LETS GO
							</span>
						</div>
					</div>
				</div>
				{/* Scroll Indicator */}
				<div className="z-10 absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
					<span className="text-lg font-medium text-gray-700">Scroll</span>
					<span className="animate-bounce mt-2 text-2xl text-blue-500">↓</span>
				</div>
			</div>
			{/* Main Content Section */}
			<div className="max-w-4xl mx-auto py-8 px-4">
				<div className="flex items-center gap-4 mb-6">
					<select
						className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 px-3 py-2 rounded"
						value={availability}
						onChange={(e) => {
							setAvailability(e.target.value);
							setCurrentPage(1);
						}}
					>
						<option value="">Availability</option>
						<option value="Weekends">Weekends</option>
						<option value="Evenings">Evenings</option>
					</select>
					<input
						type="text"
						placeholder="Search skills..."
						className="flex-1 bg-gray-800 dark:bg-gray-200 px-4 py-2 rounded text-white dark:text-gray-900"
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							setCurrentPage(1);
						}}
					/>
					<button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 px-4 py-2 rounded text-white dark:text-gray-900">
						Search
					</button>
				</div>
        <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 px-4 py-2 rounded text-white dark:text-gray-900">
						<a href="swap-requests">Request</a>
				</button>
				<div className="space-y-4">
					{paginatedProfiles.map((profile, idx) => (
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
        
				<Pagination
					totalPages={totalPages}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</div>
			<LoginModal isOpen={showModal} onClose={() => setShowModal(false)} />
		</div>
	);
}
