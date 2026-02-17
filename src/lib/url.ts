import {
  MIN_YEAR,
  MAX_YEAR,
  MIN_RATING,
  MAX_RATING,
  ALLOWED_SORTS,
} from "./constants";
import { Range, SearchState, SortOption } from "./types";

import { DEFAULT_SEARCH_STATE } from "./constants";

export function serializeSearchState(
  state: SearchState
): URLSearchParams {
  const params = new URLSearchParams();

  if (state.query) {
    params.set("query", state.query);
  }

  if (state.type !== DEFAULT_SEARCH_STATE.type) {
    params.set("type", state.type);
  }

  if (state.year) {
    params.set("year", `${state.year.min}-${state.year.max}`);
  }

  if (state.rating) {
    params.set("rating", `${state.rating.min}-${state.rating.max}`);
  }

  if (state.genres.length > 0) {
    params.set("genres", [...state.genres].sort().join(","));
  }

  if (state.sort !== DEFAULT_SEARCH_STATE.sort) {
    params.set("sort", state.sort);
  }
if (state.selected) {
  params.set("selected", state.selected);
}

  return params;
}


function parseRange(
  value: string | null,
  minLimit: number,
  maxLimit: number
): Range | undefined {
  if (!value) return undefined;

  const [minStr, maxStr] = value.split("-");
  const min = Number(minStr);
  const max = Number(maxStr);

  if (
    Number.isNaN(min) ||
    Number.isNaN(max) ||
    min > max ||
    min < minLimit ||
    max > maxLimit
  ) {
    return undefined;
  }

  return { min, max };
}
export function parseSearchParams(
  params: URLSearchParams
): SearchState {
  const query = params.get("query")?.trim() ?? "";

  const typeParam = params.get("type");
  const type =
    typeParam === "tv" || typeParam === "movie"
      ? typeParam
      : "movie";

  const year = parseRange(
    params.get("year"),
    MIN_YEAR,
    MAX_YEAR
  );

  const rating = parseRange(
    params.get("rating"),
    MIN_RATING,
    MAX_RATING
  );

  const genresParam = params.get("genres");
  const genres = genresParam
    ? genresParam
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean)
        .sort()
    : [];

  const sortParam = params.get("sort") as SortOption | null;
  const sort = ALLOWED_SORTS.includes(sortParam as SortOption)
    ? (sortParam as SortOption)
    : "popularity_desc";
const selected = params.get("selected") ?? undefined;

  return {
    query,
    type,
    year,
    rating,
    genres,
    sort,
    selected,
  };
}