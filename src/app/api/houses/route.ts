import { getCache, setCache } from '@/app/_core/cache/cache';
import { DEFAULT_PAGE_SIZE, HOUSE_API_URL } from '@/app/_core/config/ice-and-fire-api';
import { NextResponse } from 'next/server';

const fetchHouses = async (params: URLSearchParams) => {
  const query = params.toString();
  const res = await fetch(`${HOUSE_API_URL}?${query}`);
  const houses = await res.json();
  const linkHeader = res.headers.get('link');
  const totalPages = linkHeader ? parseLinkHeader(linkHeader) : 1;

  return { houses, totalPages };
};

const parseLinkHeader = (header: string): number => {
  const links = header.split(',').reduce((acc: any, link: string) => {
    const [urlPart, relPart] = link.split(';');
    const url = urlPart.replace(/<(.*)>/, '$1').trim();
    const rel = relPart.replace(/rel="(.*)"/, '$1').trim();
    acc[rel] = url;
    return acc;
  }, {});

  if (links.last) {
    const url = new URL(links.last);
    return parseInt(url.searchParams.get('page') || '1', 10);
  }

  return 1;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || '1';
  url.searchParams.delete('page'); // remove page from searchParams for caching purposes
  const filters = url.searchParams.toString();
  const cacheKey = `houses-page-${page}-${filters}`;
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  url.searchParams.set('page', page); // add page back to searchParams for fetching
  url.searchParams.set('pageSize', String(DEFAULT_PAGE_SIZE));
  const { houses, totalPages } = await fetchHouses(url.searchParams);
  const response = { houses, totalPages };
  setCache(cacheKey, response);
  return NextResponse.json(response);
}
