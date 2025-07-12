export default function Pagination({ totalPages, currentPage }: { totalPages: number; currentPage: number }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex justify-center mt-6 gap-2">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
