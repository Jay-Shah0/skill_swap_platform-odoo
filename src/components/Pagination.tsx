export default function Pagination({ totalPages, currentPage, onPageChange }: { totalPages: number; currentPage: number; onPageChange: (page: number) => void }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex justify-center mt-8 gap-3">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-full font-bold shadow-md border-2 transition-all duration-200
            ${page === currentPage
              ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-blue-500 scale-110'
              : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100 hover:scale-105'}
          `}
          style={{ fontFamily: 'Montserrat, Arial, sans-serif', letterSpacing: '1px' }}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
