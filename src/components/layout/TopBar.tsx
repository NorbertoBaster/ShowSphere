"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";

export function TopBar() {
  const { state, setState } = useSearchParamsState();
  const [value, setValue] = useState(state.query);

  const commitSearch = useCallback(
    (nextQuery: string) => {
      setState((prev) => ({
        ...prev,
        query: nextQuery,
      }));
    },
    [setState]
  );

  useEffect(() => {
    const id = setTimeout(() => {
      if (value !== state.query) {
        commitSearch(value.trim());
      }
    }, 300);

    return () => clearTimeout(id);
  }, [value, state.query, commitSearch]);

  return (
    <header
      style={{
        height: 56,
        borderBottom: "1px solid #222",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 12,
      }}
    >
      <strong>🎬 ShowSphere</strong>

      <input
        key={state.query}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search movies or TV shows…"
        aria-label="Search movies or TV shows"
        style={{
          flex: 1,
          maxWidth: 420,
          padding: "6px 10px",
          background: "#111",
          border: "1px solid #333",
          color: "#f5f5f5",
        }}
      />

      <div role="group" aria-label="Filter by type" style={{ display: "flex", gap: 4 }}>
        {(["movie", "tv"] as const).map((type) => {
          const active = state.type === type;

          return (
            <button
              key={type}
              onClick={() => setState({ ...state, type })}
              aria-pressed={active}
              style={{
                padding: "6px 10px",
                fontSize: 12,
                background: active ? "#333" : "#111",
                color: active ? "#fff" : "#aaa",
                border: "1px solid #333",
                cursor: "pointer",
              }}
            >
              {type.toUpperCase()}
            </button>
          );
        })}
      </div>

      <span style={{ opacity: 0.6, fontSize: 12 }}>⌘K to search</span>
    </header>
  );
}
