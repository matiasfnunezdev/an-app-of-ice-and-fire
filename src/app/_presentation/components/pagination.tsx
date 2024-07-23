"use client";

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const generatePagination = (currentPage: number, totalPages: number) => {
  const delta = 2;
  const range = [];

  for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    range.unshift('...');
  }
  if (currentPage + delta < totalPages - 1) {
    range.push('...');
  }

  range.unshift(1);
  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex justify-between items-center mt-8">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className={`px-4 py-2 border border-gotGold rounded-lg bg-gotGray hover:bg-gotBlack text-gotGold mx-2 ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <div className="flex items-center space-x-2">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`px-4 py-2 border border-gotGold rounded-lg bg-gotGray hover:bg-gotBlack text-gotGold mx-1 ${currentPage === page ? 'bg-gotGold text-gotBlack' : ''}`}
            disabled={typeof page !== 'number'}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className={`px-4 py-2 border border-gotGold rounded-lg bg-gotGray hover:bg-gotBlack text-gotGold mx-2 ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        className="px-4 py-2 border border-gotGold rounded-lg bg-gotGray hover:bg-gotBlack text-gotGold mx-2"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
