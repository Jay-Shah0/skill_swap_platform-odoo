"use client";

import { useEffect, useState, useRef } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar({
	onLoginClick,
	mode,
	setMode,
}: {
	onLoginClick: () => void;
	mode: string;
	setMode: (mode: string) => void;
}) {
	const { data: session } = useSession();
	const [profile, setProfile] = useState<any>(null);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => {
		setMode(mode === "light" ? "dark" : "light");
	};

	useEffect(() => {
		if (session?.user?.email) {
			fetch("/api/user/profile")
				.then((res) => res.json())
				.then((data) => {
					setProfile(data);
					localStorage.setItem("userProfile", JSON.stringify(data));
				})
				.catch(console.error);
		}
	}, [session]);

	// Close dropdown if clicked outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<nav
			className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center ${
				mode === "dark" ? "bg-gray-800" : "bg-gray-200"
			}`}
		>
			<Link href="/">
				<div className="flex items-center gap-2 cursor-pointer">
					<img src="/globe.svg" alt="SkillSwap Logo" className="h-8 w-8" />
					<h1
						className={`text-xl font-bold ${
							mode === "dark" ? "text-white" : "text-gray-900"
						}`}
					>
						Skill Swap Platform
					</h1>
				</div>
			</Link>
			<div className="flex items-center gap-4 relative">
				<button
					onClick={handleToggle}
					className={`p-2 rounded-full border-2 ${
						mode === "dark"
							? "border-white text-yellow-300"
							: "border-gray-800 text-gray-800"
					}`}
					aria-label="Toggle dark/light mode"
				>
					{mode === "dark" ? <FaMoon size={20} /> : <FaSun size={20} />}
				</button>

				{session?.user && profile ? (
					<div className="relative" ref={dropdownRef}>
						<img
							src={profile.profilePic || "/avatar1.jpeg"}
							alt="Profile"
							className="h-10 w-10 rounded-full cursor-pointer border-2 border-blue-500"
							onClick={() => setDropdownOpen((prev) => !prev)}
						/>
						{dropdownOpen && (
							<div
								className={`absolute right-0 mt-2 w-40 bg-white rounded shadow-md ${
									mode === "dark" ? "bg-gray-700 text-white" : "text-gray-900"
								}`}
							>
								<button
									onClick={() => signOut()}
									className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
								>
									Logout
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						<button
							onClick={() => (window.location.href = "/signup")}
							className={`px-4 py-2 rounded ${
								mode === "dark"
									? "bg-blue-500 hover:bg-blue-600 text-white"
									: "bg-blue-400 hover:bg-blue-500 text-gray-900"
							}`}
						>
							SignUp
						</button>
						<button
							onClick={() => (window.location.href = "/login")}
							className={`px-4 py-2 rounded ${
								mode === "dark"
									? "bg-blue-500 hover:bg-blue-600 text-white"
									: "bg-blue-400 hover:bg-blue-500 text-gray-900"
							}`}
						>
							Login
						</button>
					</>
				)}
			</div>
		</nav>
	);
}
