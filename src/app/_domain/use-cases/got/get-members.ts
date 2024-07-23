import { Member } from '@/app/_domain/interfaces/got';
import { GotRepository } from '../../repositories/got-api-repository';

export interface GetMembersUseCase {
  invoke: (urls: string[]) => Promise<Member[]>;
}

export class GetMembers implements GetMembersUseCase {
  private gotAPI: GotRepository;

  constructor(api: GotRepository) {
    this.gotAPI = api;
  }

  invoke(urls: string[]): Promise<Member[]> {
    return this.gotAPI.getMembers(urls);
  }
}
