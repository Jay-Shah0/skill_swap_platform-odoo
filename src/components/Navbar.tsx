export default function Navbar({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">Skill Swap Platform</h1>
      <button
        onClick={onLoginClick}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </nav>
  );
}