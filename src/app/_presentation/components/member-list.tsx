/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Member } from '@/app/_domain/interfaces/got';
import GetMembersViewModel from '@/app/_presentation/view-models/got/get-members-view-model';
import { useGot } from '../context/got-context';

const MemberList: React.FC<{ urls: string[] }> = ({ urls }) => {
  const { members, setMembers } = useGot();
  const { getMembers, membersData, loading } = GetMembersViewModel();
  const [characterDetails, setCharacterDetails] = useState<Member[]>([]);
  const cachedDetailsRef = useRef<{ [url: string]: Member }>({});

  useEffect(() => {
    const loadCharacterDetails = async () => {
      const uncachedUrls = urls.filter(url => !cachedDetailsRef.current[url]);
      if (uncachedUrls.length > 0) {
        await getMembers(uncachedUrls);
      }
    };

    loadCharacterDetails();
  }, [urls]);

  useEffect(() => {
    if (membersData?.length) {
      setMembers([...members, ...membersData]);
    }
  }, [membersData])

  useEffect(() => {
    if (members) {
      members.forEach(detail => {
        cachedDetailsRef.current[detail.url] = detail;
      });

      setCharacterDetails(urls.map(url => cachedDetailsRef.current[url]));
    }
  }, [members, urls]);

  return (
    <div className="p-4 bg-gotGray border border-gotGold rounded-lg">
      {loading ? (
        <p className="text-gotGold">Loading members...</p>
      ) : characterDetails.length > 0 ? (
        <ul className="space-y-4">
          {characterDetails.map((character, index) => (
            <li key={index} className="mb-2">
              <span className="font-bold text-gotGold">{character?.name}</span> - <span className="text-white">{character?.died ? `Died: ${character?.died}` : 'Alive'}</span>
              <div className="ml-4 mt-2">
                <div className="text-gotGold"><strong>Gender:</strong> <span className="text-white">{character?.gender}</span></div>
                <div className="text-gotGold"><strong>Culture:</strong> <span className="text-white">{character?.culture}</span></div>
                <div className="text-gotGold"><strong>Titles:</strong> <span className="text-white">{character?.titles?.join(', ') || 'None'}</span></div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gotRed">This house has no sworn members</p>
      )}
    </div>
  );
};

export default MemberList;
