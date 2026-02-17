import { SearchState } from "@/lib/types";

export function buildDiscoverParams(state: SearchState) {
  return {
    query: state.query || undefined,

    sort_by: state.sort,

    with_genres:
      state.genres.length > 0
        ? state.genres.join(",")
        : undefined,
  };
}
