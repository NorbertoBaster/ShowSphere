"use client";

import { GENRES } from "@/lib/genres";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";

export function GenreFilter() {
  const { state, setState } = useSearchParamsState();
  const selected = state.genres;

  function toggleGenre(id: string) {
    const next = selected.includes(id)
      ? selected.filter((g) => g !== id)
      : [...selected, id];

    setState({
      ...state,
      genres: next,
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 12, opacity: 0.7 }}>Genres</span>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {GENRES.map((genre) => {
          const active = selected.includes(genre.id);

          return (
            <button
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              style={{
                padding: "4px 8px",
                fontSize: 12,
                borderRadius: 4,
                cursor: "pointer",
                background: active ? "#f5f5f5" : "#111",
                color: active ? "#000" : "#f5f5f5",
                border: "1px solid #333",
              }}
            >
              {genre.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
