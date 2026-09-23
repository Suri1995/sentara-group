export interface VentureStat {
  value: string;
  label: string;
}

export interface Venture {
  title: string;
  location: string;
  image?: string;
  description: string;
  stats: VentureStat[];
  highlights: string[];
}