export default function SkillCard({
  profile,
  isLoggedIn,
  onRequest,
}: {
  profile: any;
  isLoggedIn: boolean;
  onRequest: () => void;
}) {
  return (
    <div className="bg-gray-800 dark:bg-gray-200 p-4 rounded flex justify-between items-center text-white dark:text-gray-900">
      <div className="flex items-center gap-4">
        <img
          src={profile.photoUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{profile.name}</h2>
          <p className="text-green-400 dark:text-green-700 text-sm">
            Skills Offered: {profile.skillsOffered.join(", ")}
          </p>
          <p className="text-blue-300 dark:text-blue-700 text-sm">
            Skills Wanted: {profile.skillsWanted.join(", ")}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="mb-2">Rating: {profile.rating}/5</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-300 dark:hover:bg-blue-400 px-4 py-2 rounded text-white dark:text-gray-900"
          onClick={onRequest}
        >
          Request
        </button>
      </div>
    </div>
  );
}