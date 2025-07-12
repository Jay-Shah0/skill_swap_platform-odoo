export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-6">Create Your Account</h1>
        <form className="space-y-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white mt-1"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white mt-1"
              placeholder="Create a password"
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white mt-1"
              placeholder="Re-enter your password"
            />
          </div>
          <a href="/Profile">
            <button
              type="button"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
            >
              Continue to Profile Setup
            </button>
          </a>
          <p className="text-sm text-center text-blue-400">
            Already have an account? <a href="/Login" className="underline">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}
