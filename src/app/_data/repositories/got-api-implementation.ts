import { AxiosFetchRepository } from '@/app/_core/repositories/fetch-repository';
import { Member, HousesResponse } from '@/app/_domain/interfaces/got';

export class GotAPIImplementation extends AxiosFetchRepository {
  private baseUrl = '/api'; // Using Next.js endpoints

  getHouses(page: number, pageSize: number, filters: Record<string, string | boolean>): Promise<HousesResponse> {
    const query = new URLSearchParams({ page: String(page), pageSize: String(pageSize), ...filters }).toString();
    const url = `${this.baseUrl}/houses?${query}`;
    return super.get<HousesResponse>(url);
  }

  getMembers(urls: string[]): Promise<Member[]> {
    return super.post<Member[]>(`${this.baseUrl}/members`, { memberUrls: urls });
  }
}
