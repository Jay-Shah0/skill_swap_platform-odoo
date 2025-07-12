import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Persist mode in localStorage and sync across pages
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mode") || "dark";
    }
    return "light";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mode", mode);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(mode);
    }
  }, [mode]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black ${
        isOpen ? "bg-opacity-60" : ""
      } flex justify-center items-center z-50 ${mode}`}
    >
      <div className="absolute top-4 left-4 right-4">
        <Navbar onLoginClick={onClose} mode={mode} setMode={setMode} />
      </div>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded shadow-lg w-80 mt-20">
        <h2 className="text-lg font-bold mb-4">Login Required</h2>
        <p className="mb-4">Please login to send a request.</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-red-500 font-bold">
            Cancel
          </button>
          <a
            href="/Login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
}