export default function Pagination({ totalPages, currentPage }: { totalPages: number; currentPage: number }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex justify-center mt-6 gap-2">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded transition-colors duration-150
            ${page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-white dark:bg-gray-200 dark:text-gray-900'}
          `}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
