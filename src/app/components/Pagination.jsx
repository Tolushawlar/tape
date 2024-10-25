import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; // Import arrow icons

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const startPage = Math.max(2, currentPage - 2);
        const endPage = Math.min(totalPages - 1, currentPage + 2);

        // Always display the first page
        pages.push(1);

        // Add ... before the start if necessary
        if (startPage > 2) {
            pages.push("...");
        }

        // Add pages between the start and end
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add ... after the end if necessary
        if (endPage < totalPages - 1) {
            pages.push("...");
        }

        // Always display the last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageClick = (page) => {
        if (page !== "..." && page !== currentPage) {
            onPageChange(page);
        }
    };

    const handlePreviousClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex justify-center items-center md:space-x-4 space-x-1 mt-6">
            {/* Left arrow for previous page */}
            <button
                className={`px-3 py-1 ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black"
                    }`}
                onClick={handlePreviousClick}
                disabled={currentPage === 1}
            >
                <AiOutlineLeft />
            </button>

            {/* Page numbers */}
            {pageNumbers.map((page, index) => (
                <button
                    key={index}
                    className={`px-3 py-1 ${page === currentPage
                            ? "border-b-2 border-black"
                            : "text-gray-600 hover:text-black"
                        }`}
                    onClick={() => handlePageClick(page)}
                    disabled={page === "..."}
                >
                    {page}
                </button>
            ))}

            {/* Right arrow for next page */}
            <button
                className={`px-3 py-1 ${currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-black"
                    }`}
                onClick={handleNextClick}
                disabled={currentPage === totalPages}
            >
                <AiOutlineRight />
            </button>
        </div>
    );
};

export default Pagination;
