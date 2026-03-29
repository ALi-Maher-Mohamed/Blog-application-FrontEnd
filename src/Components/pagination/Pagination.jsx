import "./pagination.css";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  // تحويل التأكد من أن pages رقم
  const totalPages = Number(pages);

  // إنشاء مصفوفة الصفحات بطريقة أسرع ومختصرة
  const generatedPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="page previous"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {generatedPages.map((page) => (
        <button // غيرنا div لـ button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? "page active" : "page"}
        >
          {page}
        </button>
      ))}

      <button
        className="page next"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
