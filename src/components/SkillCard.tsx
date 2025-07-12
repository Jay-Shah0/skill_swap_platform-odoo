"use client";

export default function SkillCard({
	profile,
	isLoggedIn,
	onRequest,
}: {
	profile: any;
	isLoggedIn: boolean;
	onRequest: () => void;
}) {
	// Color list for skill boxes
	const colorList = [
		"#60A5FA",
		"#F59E42",
		"#34D399",
		"#F472B6",
		"#A78BFA",
		"#FBBF24",
		"#F87171",
		"#38BDF8",
		"#10B981",
		"#6366F1",
	];

	const getColor = (idx: number) => colorList[idx % colorList.length];

	const handleClick = () => {
		if (isLoggedIn) {
			onRequest();
		} else {
			alert("Please login to send a request.");
		}
	};

	return (
		<div className="bg-gray-800 dark:bg-gray-200 p-8 rounded-2xl flex justify-between items-center text-white dark:text-gray-900 shadow-lg mb-6">
			<div className="flex items-center gap-8">
				<a
					href={`/userProfile?email=${encodeURIComponent(profile.email)}`}
					className="flex-shrink-0"
				>
					<img
						src={profile.profilePic}
						alt="Profile"
						className="w-24 h-24 rounded-full object-cover border-4 border-blue-400"
					/>
				</a>
				<div>
					<a
						href={`/profileuser?email=${encodeURIComponent(profile.email)}`}
						className="block mb-2"
					>
						<h2 className="font-bold text-2xl mb-2">{profile.name}</h2>
					</a>
					<div className="mb-2">
						<span className="block text-green-400 dark:text-green-700 text-lg font-semibold mb-1">
							Skills Offered:
						</span>
						<div className="flex flex-wrap gap-2">
							{profile.skillsOffered.map((skill: string, idx: number) => (
								<span
									key={idx}
									className="px-3 py-1 rounded-xl border-2 text-base font-medium bg-white dark:bg-gray-100"
									style={{
										borderColor: getColor(idx),
										color: getColor(idx),
									}}
								>
									{skill}
								</span>
							))}
						</div>
					</div>
					<div>
						<span className="block text-blue-300 dark:text-blue-700 text-lg font-semibold mb-1">
							Skills Wanted:
						</span>
						<div className="flex flex-wrap gap-2">
							{profile.skillsWanted.map((skill: string, idx: number) => (
								<span
									key={idx}
									className="px-3 py-1 rounded-xl border-2 text-base font-medium bg-white dark:bg-gray-100"
									style={{
										borderColor: getColor(idx),
										color: getColor(idx + 5),
									}}
								>
									{skill}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="text-right min-w-[120px]">
				<p className="mb-4 text-lg font-semibold">Rating: {profile.rating}/5</p>
				<button
					className={`${
						isLoggedIn
							? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-300 dark:hover:bg-blue-400"
							: "bg-gray-600 cursor-pointer"
					} px-6 py-3 rounded-xl text-white dark:text-gray-900 text-lg font-bold`}
					onClick={handleClick}
				>
					Request
				</button>
			</div>
		</div>
	);
}
