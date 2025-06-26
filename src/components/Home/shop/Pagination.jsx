// components/Pagination.jsx
const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
      <div className="flex justify-center mt-8">
        <div className="join">
          <button 
            className="join-item btn btn-outline"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            « Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`join-item btn ${currentPage === i + 1 ? "btn-active" : "btn-outline"}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button 
            className="join-item btn btn-outline"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next »
          </button>
        </div>
      </div>
    );
  };
  
  export default Pagination;