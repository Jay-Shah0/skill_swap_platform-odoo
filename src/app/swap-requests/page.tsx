export default function SwapRequestsPage() {
  const dummyRequests = [
    {
      name: "Marc Demo",
      skillsOffered: ["JavaScript", "Python"],
      skillsWanted: ["Graphic Design"],
      rating: 4.5,
      status: "Pending",
      photoUrl: "/avatar1.png",
    },
    {
      name: "Joe Wills",
      skillsOffered: ["Linux"],
      skillsWanted: ["UI Design"],
      rating: 4.0,
      status: "Accepted",
      photoUrl: "/avatar2.png",
    },
    {
      name: "Michell",
      skillsOffered: ["Photoshop"],
      skillsWanted: ["Excel"],
      rating: 3.8,
      status: "Rejected",
      photoUrl: "/avatar3.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Swap Requests</h1>
        <a href="/" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Home
        </a>
      </div>
      <div className="space-y-4">
        {dummyRequests.map((req, i) => (
          <div
            key={i}
            className="bg-gray-800 p-4 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="flex items-center gap-4 w-full">
              <img src={req.photoUrl} className="w-16 h-16 rounded-full object-cover" alt="avatar" />
              <div>
                <p className="text-lg font-semibold">{req.name}</p>
                <p className="text-sm text-green-400">Offered: {req.skillsOffered.join(", ")}</p>
                <p className="text-sm text-blue-300">Wanted: {req.skillsWanted.join(", ")}</p>
                <p className="text-sm text-gray-300">Rating: {req.rating}/5</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 text-left sm:text-right w-full sm:w-auto">
              <span
                className={`inline-block px-3 py-1 rounded text-sm font-semibold mb-2 ${
                  req.status === "Pending"
                    ? "bg-yellow-500"
                    : req.status === "Accepted"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {req.status}
              </span>
              {req.status === "Pending" && (
                <div>
                  <button className="block text-red-400 hover:underline text-sm mt-1">Cancel</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
