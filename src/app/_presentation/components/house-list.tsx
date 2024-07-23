/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import HouseItem from './house-item';
import { House, HousesResponse } from '@/app/_domain/interfaces/got';
import { useGot } from '@/app/_presentation/context/got-context';
import Filters from './filters';
import Pagination from './pagination';

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const HouseList: React.FC<{ initialHousesData: HousesResponse, initialPage: number, initialFilters: Record<string, string | boolean> }> = ({ initialHousesData, initialPage, initialFilters }) => {
  const { houses, setHouses } = useGot();
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(initialHousesData.totalPages);
  const [filters, setFilters] = useState<Record<string, string | boolean>>(initialFilters);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setHouses(initialHousesData.houses);
  }, [initialHousesData, setHouses]);

  const fetchHouses = useCallback(async (page: number, filters: Record<string, string | boolean>) => {
    setLoading(true);
    const query = new URLSearchParams({ page: String(page), ...filters }).toString();
    const res = await fetch(`/api/houses?${query}`);
    const data: HousesResponse = await res.json();
    setHouses(data.houses);
    setTotalPages(data.totalPages);
    setLoading(false);
  }, [setHouses]);

  const debouncedFetchHouses = useCallback(debounce(fetchHouses, 500), [fetchHouses]);

  useEffect(() => {
    if (currentPage !== initialPage || JSON.stringify(filters) !== JSON.stringify(initialFilters)) {
      debouncedFetchHouses(currentPage, filters);
    }
  }, [currentPage, filters, debouncedFetchHouses]);

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
    setCurrentPage(1); // Reset to the first page when filters change
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gotGold">Houses and Sworn Members</h1>
      <Filters handleFilterChange={handleFilterChange} />
      {loading ? (
        <div className="text-center text-gotGold">Loading...</div>
      ) : (
        <>
          {houses.map(house => (
            <HouseItem key={house.url} house={house} />
          ))}
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
};

export default HouseList;
