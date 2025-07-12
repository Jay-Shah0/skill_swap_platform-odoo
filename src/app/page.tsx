"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import SkillCard from "../components/SkillCard";
import Pagination from "../components/Pagination";
import LoginModal from "../components/LoginModal";

export default function Home() {
	const { data: session } = useSession();
	const isLoggedIn = !!session;

	const [showModal, setShowModal] = useState(false);
	const [search, setSearch] = useState("");
	const [availability, setAvailability] = useState("");
	const [mode, setMode] = useState(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("mode") || "light";
		}
		return "light";
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [profiles, setProfiles] = useState<any[]>([]);
	const profilesPerPage = 5;

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("mode", mode);
			document.documentElement.classList.remove("dark", "light");
			document.documentElement.classList.add(mode);
		}
	}, [mode]);

	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				const res = await fetch("/api/user/all");
				const result = await res.json();

				if (Array.isArray(result.users)) {
					const filtered = session?.user?.email
						? result.users.filter(
								(user: any) => user.email !== session.user.email
						  )
						: result.users;

					setProfiles(filtered);
				} else {
					console.error("Unexpected API response:", result);
					setProfiles([]);
				}
			} catch (err) {
				console.error("Failed to fetch profiles", err);
				setProfiles([]);
			}
		};

		fetchProfiles();
	}, [session]);

	const filteredProfiles = profiles.filter(
		(profile) =>
			profile.isPublic &&
			Array.isArray(profile.skillsWanted) &&
			profile.skillsWanted.some((skill: string) =>
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
				</div>

				<div className="space-y-4">
					{paginatedProfiles.map((profile, idx) => (
						<SkillCard
							key={idx}
							profile={{
								...profile,
								rating: profile.rating === null ? "-" : profile.rating,
							}}
							isLoggedIn={isLoggedIn}
							onRequest={() => {
								window.location.href = `/swap-requests?email=${encodeURIComponent(
									profile.email
								)}`;
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
