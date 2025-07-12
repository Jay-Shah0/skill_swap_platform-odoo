// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
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

	const handleToggle = () => {
		setMode(mode === "light" ? "dark" : "light");
	};

	useEffect(() => {
		if (session?.user?.email) {
			fetch("/api/user/profile")
				.then((res) => res.json())
				.then((data) => {
					setProfile(data);
					localStorage.setItem("userProfile", JSON.stringify(data)); // optional for /profile route
				})
				.catch(console.error);
		}
	}, [session]);

	return (
		<nav
			className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center ${
				mode === "dark" ? "bg-gray-800" : "bg-gray-200"
			}`}
		>
			<Link href="/">
				<div className="flex items-center gap-2">
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

			<div className="flex items-center gap-4">
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

				{profile ? (
					<>
						<img
							src={profile.profilePic}
							alt="Profile"
							className="h-10 w-10 rounded-full border border-white cursor-pointer"
							onClick={() => (window.location.href = "/profile")}
						/>
						<button
							onClick={() => signOut()}
							className={`px-4 py-2 rounded ${
								mode === "dark"
									? "bg-red-500 hover:bg-red-600 text-white"
									: "bg-red-400 hover:bg-red-500 text-white"
							}`}
						>
							Logout
						</button>
					</>
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
