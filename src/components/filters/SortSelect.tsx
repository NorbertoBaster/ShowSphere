"use client";

import { ALLOWED_SORTS } from "@/lib/constants";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";

const LABELS: Record<string, string> = {
  popularity_desc: "Popularity",
  rating_desc: "Rating",
  release_date_desc: "Release date",
};

export function SortSelect() {
  const { state, setState } = useSearchParamsState();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 12, opacity: 0.7 }}>Sort by</label>

      <select
        value={state.sort}
        onChange={(e) =>
          setState({
            ...state,
            sort: e.target.value as typeof state.sort,
          })
        }
        style={{
          background: "#111",
          color: "#f5f5f5",
          border: "1px solid #333",
          padding: "6px 8px",
        }}
      >
        {ALLOWED_SORTS.map((sort) => (
          <option key={sort} value={sort}>
            {LABELS[sort]}
          </option>
        ))}
      </select>
    </div>
  );
}
