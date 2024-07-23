import { HousesResponse } from '@/app/_domain/interfaces/got';
import { GotRepository } from '../../repositories/got-api-repository';

export interface GetHousesUseCase {
  invoke: (page: number, pageSize: number, filters: Record<string, string | boolean>) => Promise<HousesResponse>;
}

export class GetHouses implements GetHousesUseCase {
  private gotAPI: GotRepository;

  constructor(api: GotRepository) {
    this.gotAPI = api;
  }

  invoke(page: number, pageSize: number, filters: Record<string, string | boolean>): Promise<HousesResponse> {
    return this.gotAPI.getHouses(page, pageSize, filters);
  }
}
