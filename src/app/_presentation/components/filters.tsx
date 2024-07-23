import React from 'react';

interface FiltersProps {
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filters: React.FC<FiltersProps> = ({ handleFilterChange }) => {
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
