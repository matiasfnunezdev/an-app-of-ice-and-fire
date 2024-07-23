import { getCache, setCache } from '@/app/_core/cache/cache';
import { NextResponse } from 'next/server';

const fetchMember = async (url: string) => {
  const res = await fetch(url);
  const member = await res.json();
  return member;
};

export async function POST(request: Request) {
  const { memberUrls } = await request.json();

  const results = await Promise.all(
    memberUrls.map(async (memberUrl: string) => {
      const cacheKey = `member-${memberUrl}`;
      const cachedData = getCache(cacheKey);

      if (cachedData) {
        return cachedData;
      }

      const member = await fetchMember(memberUrl);
      setCache(cacheKey, member);
      return member;
    })
  );

  return NextResponse.json(results);
}
