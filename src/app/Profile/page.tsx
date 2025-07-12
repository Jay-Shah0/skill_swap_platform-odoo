import Image from "next/image";

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-bold">Skill Swap Platform</h1>
          <a href="/swap-requests" className="underline">Swap Request</a>
        </div>
        <a href="/" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Home
        </a>
      </div>
      <div className="bg-gray-800 p-6 rounded">
        <div className="flex justify-between">
          <div>
            <div className="mb-4">
              <label>Name</label>
              <input className="block w-full bg-gray-700 p-2 rounded mt-1" />
            </div>
            <div className="mb-4">
              <label>Location</label>
              <input className="block w-full bg-gray-700 p-2 rounded mt-1" />
            </div>
            <div className="mb-4">
              <label>Skills Offered</label>
              <input className="block w-full bg-gray-700 p-2 rounded mt-1" placeholder="e.g. Python, JavaScript" />
            </div>
            <div className="mb-4">
              <label>Skills Wanted</label>
              <input className="block w-full bg-gray-700 p-2 rounded mt-1" placeholder="e.g. Designer, Photoshop" />
            </div>
            <div className="mb-4">
              <label>Availability</label>
              <input className="block w-full bg-gray-700 p-2 rounded mt-1" placeholder="e.g. Weekends" />
            </div>
            <div className="mb-4">
              <label>Profile Visibility</label>
              <select className="block w-full bg-gray-700 p-2 rounded mt-1">
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
          </div>
          <div className="text-center">
            <div className="w-28 h-28 rounded-full bg-gray-600 mx-auto mb-2">
              <Image
                src="/avatar1.jpeg" // Default avatar, replace with user's photo URL if available
                alt="Profile Photo"
                width={112}
                height={112}
                className="rounded-full object-cover w-28 h-28"
              />
            </div> 
            <button className="underline text-sm text-blue-400">Add/Edit Photo</button>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Save</button>
          <button className="text-red-500">Discard</button>
        </div>
      </div>
    </div>
  );
}
