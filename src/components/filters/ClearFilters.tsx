"use client";

import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { DEFAULT_STATE } from "@/lib/defaults";

export function ClearFilters() {
  const { state, setState } = useSearchParamsState();

  const hasFilters =
    state.genres.length > 0 ||
    state.sort !== DEFAULT_STATE.sort;

  if (!hasFilters) return null;

  return (
    <button
      onClick={() =>
        setState({
          ...state,
          genres: DEFAULT_STATE.genres,
          sort: DEFAULT_STATE.sort,
        })
      }
      style={{
        alignSelf: "flex-start",
        fontSize: 12,
        opacity: 0.7,
        background: "transparent",
        color: "#f5f5f5",
        border: "none",
        cursor: "pointer",
      }}
    >
      Clear filters
    </button>
  );
}

