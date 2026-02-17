export type MediaType = "movie" | "tv";

export type SortOption =
  | "popularity_desc"
  | "rating_desc"
  | "rating_asc"
  | "year_desc"
  | "year_asc";

export type Range = {
  min: number;
  max: number;
};

export type SearchState = {
  query: string;
  type: MediaType;
  year?: Range;
  rating?: Range;
  genres: string[];
  sort: SortOption;
  selected?: string; // URL param for details modal
};

export type TMDBResult = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
};
