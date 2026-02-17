import { SearchState, SortOption } from "./types";

export const DEFAULT_SEARCH_STATE: SearchState = {
  query: "",
  type: "movie",
  genres: [],
  sort: "popularity_desc",
};

export const ALLOWED_SORTS: SortOption[] = [
  "popularity_desc",
  "rating_desc",
  "rating_asc",
  "year_desc",
  "year_asc",
];

export const MIN_YEAR = 1900;
export const MAX_YEAR = new Date().getFullYear();

export const MIN_RATING = 0;
export const MAX_RATING = 10;
