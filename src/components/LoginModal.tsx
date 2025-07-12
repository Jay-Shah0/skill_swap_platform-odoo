export default function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Login Required</h2>
        <p className="mb-4">Please login to send a request.</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-red-500 font-bold">Cancel</button>
          <a href="/Login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
}