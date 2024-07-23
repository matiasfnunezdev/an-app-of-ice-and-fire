import { useState } from 'react';
import { Member } from '@/app/_domain/interfaces/got';
import { GetMembers } from '@/app/_domain/use-cases/got/get-members';
import { GotAPIImplementation } from '@/app/_data/repositories/got-api-implementation';

interface GetMembersViewModelResponse {
  getMembers: (urls: string[]) => Promise<void>;
  membersData: Member[] | undefined;
  error: string | undefined;
  loading: boolean;
}

export default function GetMembersViewModel(): GetMembersViewModelResponse {
  const [membersData, setMembersData] = useState<Member[] | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const useCase = new GetMembers(new GotAPIImplementation());

  async function getMembers(urls: string[]): Promise<void> {
    try {
      setLoading(true);
      const response: Member[] = await useCase.invoke(urls);
      if (response) {
        setMembersData(response);
      } else {
        setError('Error getting members info.');
      }
    } catch (error) {
      console.error(error);
      setError('Unexpected error getting members info.');
    } finally {
      setLoading(false);
    }
  }

  return {
    getMembers,
    membersData,
    error,
    loading,
  };
}
