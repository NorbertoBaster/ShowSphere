import type { SearchState } from "./types";

export const DEFAULT_STATE: SearchState = {
  query: "",
  type: "movie",
  genres: [],
  sort: "popularity_desc",
};
