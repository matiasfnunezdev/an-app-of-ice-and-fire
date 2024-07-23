import { useState } from 'react';
import { HousesResponse } from '@/app/_domain/interfaces/got';
import { GetHouses } from '@/app/_domain/use-cases/got/get-houses';
import { GotAPIImplementation } from '@/app/_data/repositories/got-api-implementation';

interface GetHousesViewModelResponse {
  getHouses: (page: number, pageSize: number, filters: Record<string, string | boolean>) => Promise<void>;
  housesData: HousesResponse;
  error: string | undefined;
  loading: boolean;
}

export default function GetHousesViewModel(): GetHousesViewModelResponse {
  const [housesData, setHousesData] = useState<HousesResponse>({ houses: [], totalPages: 1});
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const useCase = new GetHouses(new GotAPIImplementation());

  async function getHouses(page: number, pageSize: number, filters: Record<string, string | boolean>): Promise<void> {
    try {
      setLoading(true);
      const response: HousesResponse = await useCase.invoke(page, pageSize, filters);
      if (response.houses) {
        setHousesData(response);
      } else {
        setError('Error getting houses info.');
      }
    } catch (error) {
      console.error(error);
      setError('Unexpected error getting houses info.');
    } finally {
      setLoading(false);
    }
  }

  return {
    getHouses,
    housesData,
    error,
    loading,
  };
}
