import { GotAPIImplementation } from '@/app/_data/repositories/got-api-implementation';
import {HousesResponse } from '@/app/_domain/interfaces/got';

export interface GetHousesUseCase {
  invoke: (page: number, pageSize: number, filters: Record<string, string | boolean>) => Promise<HousesResponse>;
}

export class GetHouses implements GetHousesUseCase {
  private gotAPI: GotAPIImplementation;

  constructor(api: GotAPIImplementation) {
    this.gotAPI = api;
  }

  invoke(page: number, pageSize: number, filters: Record<string, string | boolean>): Promise<HousesResponse> {
    return this.gotAPI.getHouses(page, pageSize, filters);
  }
}
