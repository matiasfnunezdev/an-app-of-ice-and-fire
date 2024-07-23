import { createContext, useContext, useState, ReactNode } from 'react';
import { House, Member } from '@/app/_domain/interfaces/got';

interface GotContextProps {
  houses: House[];
  members: Member[];
  selectedHouse: House | null;
  setSelectedHouse: (house: House | null) => void;
  setHouses: (houses: House[]) => void;
  setMembers: (members: Member[]) => void;
}

const GotContext = createContext<GotContextProps | undefined>(undefined);

interface GotProviderProps {
  children: ReactNode;
}

export const GotProvider: React.FC<GotProviderProps> = ({ children }) => {
  const [houses, setHouses] = useState<House[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

  const value = { houses, members, selectedHouse, setSelectedHouse, setHouses, setMembers };

  return <GotContext.Provider value={value}>{children}</GotContext.Provider>;
};

export const useGot = (): GotContextProps => {
  const context = useContext(GotContext);
  if (!context) {
    throw new Error('useGot must be used within a GotProvider');
  }
  return context;
};
