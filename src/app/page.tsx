// pages/index.tsx
"use client";
import { useState } from "react";

// components
import Navbar from "../components/Navbar";
import SkillCard from "../components/SkillCard";
import Pagination from "../components/Pagination";
import LoginModal from "../components/LoginModal";

const dummyProfiles = [
  {
    name: "Marc Demo",
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Graphic designer"],
    rating: 3.9,
    isPublic: true,
    photoUrl: "/avatar1.png",
    availability: "Weekends",
  },
  {
    name: "Michell",
    skillsOffered: ["JavaScript"],
    skillsWanted: ["Graphic designer"],
    rating: 2.5,
    isPublic: true,
    photoUrl: "/avatar2.png",
    availability: "Weekends",
  },
  {
    name: "Joe Wills",
    skillsOffered: ["Linux"],
    skillsWanted: ["Graphic designer"],
    rating: 4.0,
    isPublic: true,
    photoUrl: "/avatar3.png",
    availability: "Weekends",
  },
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProfiles = dummyProfiles.filter(
    (profile) =>
      profile.isPublic &&
      profile.skillsOffered.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar onLoginClick={() => setShowModal(true)} />

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-6">
          <select className="bg-gray-800 text-white px-3 py-2 rounded">
            <option>Availability</option>
            <option>Weekends</option>
            <option>Evenings</option>
          </select>

          <input
            type="text"
            placeholder="Search skills..."
            className="flex-1 bg-gray-800 px-4 py-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
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
