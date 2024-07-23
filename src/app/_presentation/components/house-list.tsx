/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import HouseItem from './house-item';
import GetHousesViewModel from '@/app/_presentation/view-models/got/get-houses-view-model';
import Filters from './filters';
import Pagination from './pagination';
import { useGot } from '../context/got-context';
import { debounce } from '../utils/debounce';

const HouseList: React.FC = () => {
  const { houses, setHouses } = useGot();
  const { getHouses, housesData, loading } = GetHousesViewModel();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});

  const debouncedSearch = useCallback(
    debounce(async (page: number, filters: Record<string, string | boolean>) => {
      await getHouses(page, 10, filters);
    }, 500),
    []
  );

  useEffect(() => {
    if (housesData) {
      setHouses(housesData.houses);
      setTotalPages(housesData.totalPages);
    }
  }, [housesData]);

  useEffect(() => {
    debouncedSearch(currentPage, filters);
  }, [currentPage, filters, debouncedSearch]);

  const handleFiltersChange = (newFilters: Record<string, string | boolean>) => {
    setFilters(newFilters);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gotGold">Houses and Sworn Members</h1>

      <Filters onFiltersChange={handleFiltersChange} resetPage={resetPage} />

      {loading ? (
        <div className="text-center text-gotGold">Loading...</div>
      ) : (
        <>
          {houses.map(house => (
            <HouseItem key={house.url} house={house} />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default HouseList;
