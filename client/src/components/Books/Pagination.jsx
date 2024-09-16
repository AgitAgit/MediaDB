

function Pagination(props) {
    const { currPage, totalPages, handlePageChange } = props;
    const getPages = () => {
        const pages = [];
        let startPage, endPage;

        if (totalPages <= 7) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currPage <= 4) {
                startPage = 1;
                endPage = 6;
            } else if (currPage + 2 >= totalPages) {
                startPage = totalPages - 5;
                endPage = totalPages;
            } else {
                startPage = currPage - 2;
                endPage = currPage + 2;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };
    
    return (
        <div className="pagination-container">
            <div className="pagination-bar">
            <button
                className="pagination-button inactive"
                disabled={currPage === 1}
                onClick={() => handlePageChange(currPage - 1)}
            >
                &lt;
            </button>

            {totalPages > 7 && currPage > 4 && (
                <>
                    <button
                        className="pagination-button inactive"
                        onClick={() => handlePageChange(1)}
                    >
                        1
                    </button>
                    <span className="pagination-dots">...</span>
                </>
            )}

            {getPages().map((page, index) =>
                page === currPage ? 
                    <span key={index} className="pagination-button active">{page}</span>
                : 
                <button
                    key={index}
                    className="pagination-button inactive"
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            )}

            {totalPages > 7 && currPage + 3 <= totalPages && (
                <>
                    {currPage + 3 < totalPages && <span className="pagination-dots">...</span>}
                    <button
                        className="pagination-button inactive"
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                className="pagination-button inactive"
                disabled={currPage === totalPages}
                onClick={() => handlePageChange(currPage + 1)}
            >
                &gt;
            </button>
            </div>
        </div>
    );
}

export default Pagination;
