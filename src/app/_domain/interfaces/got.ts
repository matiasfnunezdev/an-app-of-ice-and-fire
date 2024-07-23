export interface House {
  url: string;
  name: string;
  region?: string;
  coatOfArms?: string;
  words?: string;
  titles?: string[];
  seats?: string[];
  currentLord?: string;
  heir?: string;
  overlord?: string;
  founded?: string;
  founder?: string;
  diedOut?: string;
  ancestralWeapons?: string[];
  cadetBranches?: string[];
  swornMembers: string[];
}

export interface Member {
  url: string;
  name?: string;
  gender?: string;
  culture?: string;
  titles?: string[];
  died?: string;
}

export interface HousesResponse {
  houses: House[];
  totalPages: number;
}
