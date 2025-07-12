"use client";
import { useDarkMode } from "../../components/DarkModeContext";

export default function SignupPage() {
  const { darkMode } = useDarkMode();

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? "dark" : "light"}`}>
      <div className="bg-gray-800 dark:bg-gray-200 p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-6">Create Your Account</h1>
        <form className="space-y-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900 mt-1"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900 mt-1"
              placeholder="Create a password"
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900 mt-1"
              placeholder="Re-enter your password"
            />
          </div>
          <a href="/profile">
            <button
              type="button"
              className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 text-white dark:text-gray-900 py-2 rounded"
            >
              Continue to Profile Setup
            </button>
          </a>
          <p className="text-sm text-center text-blue-400 dark:text-blue-600">
            Already have an account?{" "}
            <a href="/login" className="underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
