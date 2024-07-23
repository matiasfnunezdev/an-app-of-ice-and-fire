import { GotAPIImplementation } from '@/app/_data/repositories/got-api-implementation';
import { Member } from '@/app/_domain/interfaces/got';

export interface GetMembersUseCase {
  invoke: (urls: string[]) => Promise<Member[]>;
}

export class GetMembers implements GetMembersUseCase {
  private gotAPI: GotAPIImplementation;

  constructor(api: GotAPIImplementation) {
    this.gotAPI = api;
  }

  invoke(urls: string[]): Promise<Member[]> {
    return this.gotAPI.getMembers(urls);
  }
}
