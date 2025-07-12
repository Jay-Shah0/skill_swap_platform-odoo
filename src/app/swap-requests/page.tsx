"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function CreateSwapRequestPage() {
  // Example skills, replace with real data as needed
  const mySkills = ["JavaScript", "Python", "Linux", "Photoshop"];
  const theirSkills = ["Graphic Design", "UI Design", "Excel"];

  const [offeredSkill, setOfferedSkill] = useState("");
  const [wantedSkill, setWantedSkill] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("light");

  // Add a placeholder login handler for Navbar
  const handleLoginClick = () => {
    // You can implement login modal logic here
    alert("Login clicked");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(
      `Swap request submitted!\nOffered: ${offeredSkill}\nWanted: ${wantedSkill}\nMessage: ${message}`
    );
  };

  return (
    <div className={`min-h-screen ${mode} p-6 transition-colors duration-300 `}>
      <Navbar onLoginClick={handleLoginClick} mode={mode} setMode={setMode} />
      <div className="flex flex-col items-center justify-center min-h-[80vh] mt-8">
        
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 dark:bg-gray-200 border-2 border-white dark:border-gray-900 rounded-2xl p-8 w-full max-w-md flex flex-col gap-6 shadow-lg"
        >
          <div>
            <label
              className="block mb-2 text-lg"
              style={{ fontFamily: "cursive" }}
            >
              Choose one of your offered skills
            </label>
            <select
              className="w-full bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 px-3 py-2 rounded-lg border-2 border-white dark:border-gray-900 appearance-none focus:outline-none"
              value={offeredSkill}
              onChange={(e) => setOfferedSkill(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a skill
              </option>
              {mySkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block mb-2 text-lg"
              style={{ fontFamily: "cursive" }}
            >
              Choose one of their wanted skills
            </label>
            <select
              className="w-full bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 px-3 py-2 rounded-lg border-2 border-white dark:border-gray-900 appearance-none focus:outline-none"
              value={wantedSkill}
              onChange={(e) => setWantedSkill(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a skill
              </option>
              {theirSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block mb-2 text-lg"
              style={{ fontFamily: "cursive" }}
            >
              Message
            </label>
            <textarea
              className="w-full bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 px-3 py-2 rounded-lg border-2 border-white dark:border-gray-900 min-h-[100px] resize-none focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
          </div>
          <button
            type="submit"
            className="mx-auto bg-blue-700 hover:bg-blue-800 dark:bg-blue-400 dark:hover:bg-blue-500 text-white dark:text-gray-900 px-8 py-2 rounded-lg border-2 border-white dark:border-gray-900 text-lg"
            style={{ fontFamily: "cursive" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
