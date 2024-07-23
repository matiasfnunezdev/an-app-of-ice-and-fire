"use client";

import React, { useState } from 'react';
import MemberList from './member-list';
import { House } from '@/types/got';

const HouseItem: React.FC<{ house: House }> = ({ house }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="border-rounded mb-4 bg-gotGray hover:bg-gotBlack transition-colors duration-200">
      <h2 className="text-2xl font-semibold mb-2 cursor-pointer p-2" onClick={() => setIsExpanded(!isExpanded)}>
        {house.name}
      </h2>
      {isExpanded && <MemberList urls={house.swornMembers} />}
    </div>
  );
};

export default HouseItem;
