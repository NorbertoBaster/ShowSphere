export interface TMDBResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

export interface TMDBDiscoverResponse {
  page: number;
  results: TMDBResult[];
  total_pages: number;
  total_results: number;
}
