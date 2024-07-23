import HouseList from '@/app/_presentation/components/house-list';
import { GotAPIImplementation } from '@/app/_data/repositories/got-api-implementation';
import { HousesResponse } from '@/app/_domain/interfaces/got';

export default async function HomePage({ searchParams }: { searchParams: Record<string, string> }) {
  const { page = '1', ...filters } = searchParams;
  const api = new GotAPIImplementation();

  try {
    const housesData: HousesResponse = await api.getHouses(Number(page), 10, filters);
    return <HouseList initialHousesData={housesData} initialPage={Number(page)} initialFilters={filters} />;
  } catch (error) {
    console.error('Failed to load houses:', error);
    return <div>Failed to load houses. Please try again later.</div>;
  }
}
