"use client";

export default function UserProfile() {
  // Dummy user data for demonstration
  const user = {
    name: "Jane Doe",
    location: "New York, USA",
    skillsOffered: ["React", "Node.js", "UI/UX"],
    skillsNeeded: ["DevOps", "SEO"],
    remarks: "Passionate about building beautiful web experiences. Looking to collaborate and learn new tech!",
    rating: 4.7,
    likes: 128,
    photoUrl: "/avatar1.jpeg",
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-5xl h-full flex flex-row items-center justify-between px-12 py-16 gap-12">
        {/* User Info on the left */}
        <div className="flex-1 flex flex-col justify-center items-start h-full pr-8">
          <h2 className="text-4xl font-bold text-blue-900 dark:text-blue-200 mb-4">{user.name}</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 font-semibold">{user.location}</p>
          <div className="mb-4 w-full">
            <span className="block text-green-600 dark:text-green-400 font-bold mb-2">Skills Offered:</span>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl border border-green-400 bg-white dark:bg-gray-800 text-green-700 dark:text-green-200 font-medium text-base">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4 w-full">
            <span className="block text-blue-600 dark:text-blue-400 font-bold mb-2">Skills Needed:</span>
            <div className="flex flex-wrap gap-2">
              {user.skillsNeeded.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl border border-blue-400 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-200 font-medium text-base">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4 w-full">
            <span className="block text-purple-600 dark:text-purple-400 font-bold mb-2">Remarks:</span>
            <p className="bg-white dark:bg-gray-800 rounded-xl p-3 text-purple-700 dark:text-purple-200 text-base">{user.remarks}</p>
          </div>
          <div className="w-full flex gap-8 items-center mb-8">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold text-lg">Rating: {user.rating}/5</span>
            <span className="text-pink-600 dark:text-pink-400 font-bold text-lg">Likes: {user.likes}</span>
          </div>
          <a href="/swap-requests" className="w-full">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow text-lg transition-all duration-200">
              Request
            </button>
          </a>
        </div>
        {/* Profile Picture on the right */}
        <div className="flex-1 flex justify-end items-center h-full pl-8">
          <img src={user.photoUrl} alt="Profile" className="w-64 h-64 rounded-full object-cover border-4 border-blue-400 shadow-lg" />
        </div>
      </div>
    </div>
  );
}
