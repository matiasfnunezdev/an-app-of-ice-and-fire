"use client";

import React, { useState, useEffect } from 'react';

interface FiltersProps {
  onFiltersChange: (filters: Record<string, string | boolean>) => void;
  resetPage: () => void;
}

const Filters: React.FC<FiltersProps> = ({ onFiltersChange, resetPage }) => {
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (type === 'checkbox' && !checked) {
        delete newFilters[name];
      }
      if (type === 'text' && !value) {
        delete newFilters[name];
      }
      return newFilters;
    });
    resetPage();
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="House Name"
          className="p-2 border border-gotGold bg-gotGray text-gotGold rounded"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="region"
          placeholder="Region"
          className="p-2 border border-gotGold bg-gotGray text-gotGold rounded"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="words"
          placeholder="Words"
          className="p-2 border border-gotGold bg-gotGray text-gotGold rounded"
          onChange={handleFilterChange}
        />
        <label className="flex items-center text-gotGold">
          <input
            type="checkbox"
            name="hasWords"
            className="mr-2"
            onChange={handleFilterChange}
          />
          Has Words
        </label>
        <label className="flex items-center text-gotGold">
          <input
            type="checkbox"
            name="hasTitles"
            className="mr-2"
            onChange={handleFilterChange}
          />
          Has Titles
        </label>
        <label className="flex items-center text-gotGold">
          <input
            type="checkbox"
            name="hasSeats"
            className="mr-2"
            onChange={handleFilterChange}
          />
          Has Seats
        </label>
        <label className="flex items-center text-gotGold">
          <input
            type="checkbox"
            name="hasDiedOut"
            className="mr-2"
            onChange={handleFilterChange}
          />
          Has Died Out
        </label>
        <label className="flex items-center text-gotGold">
          <input
            type="checkbox"
            name="hasAncestralWeapons"
            className="mr-2"
            onChange={handleFilterChange}
          />
          Has Ancestral Weapons
        </label>
      </div>
    </div>
  );
};

export default Filters;
