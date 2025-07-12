export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Skill Swap Platform</h1>
          <a href="/" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Home
          </a>
        </div>
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
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
            Login
          </button>
          <div className="text-sm text-center text-blue-400 mt-2">
            <a href="#">Forgot username/password?</a>
          </div>
          <div className="text-sm text-center text-blue-400 mt-2">
            Already have an account?
            <a href="/Signup">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
}
