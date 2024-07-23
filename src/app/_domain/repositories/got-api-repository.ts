import { HousesResponse, Member } from "../interfaces/got";

export interface GotRepository {
  getHouses: (page: number, pageSize: number, filters: Record<string, string | boolean>) => Promise<HousesResponse>;
  getMembers: (urls: string[]) => Promise<Member[]>;
}
