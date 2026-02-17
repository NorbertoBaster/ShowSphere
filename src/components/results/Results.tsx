"use client";

import { useState } from "react";
import { useDiscoverQuery } from "@/hooks/useDiscoverQuery";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";
import { ResultsGrid } from "./ResultsGrid";
import { DetailsModal } from "../details/DetailsModal";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";

export function Results() {
  const { state, setState } = useSearchParamsState();
  const { data, status, error } = useDiscoverQuery();

  // Local input state, initialized from URL query
  const [localQuery, setLocalQuery] = useState(state.query || "");

  const isLoading = status === "loading";

  if (status === "error") {
    return <ErrorState message={error ?? "Something went wrong"} />;
  }

  if (!isLoading && (!data || data.results.length === 0)) {
    return <EmptyState />;
  }

  return (
    <>
      {/* Search Input */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setState((prev) => ({
                ...prev,
                query: localQuery.trim(),
              }));
            }
          }}
          placeholder="Search movies or TV shows..."
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: 4,
            border: "1px solid #333",
            background: "#111",
            color: "#fff",
            outline: "none",
          }}
        />
      </div>

      {/* Screen reader live region */}
      <div
        aria-live="polite"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        {`Found ${data?.results.length || 0} ${
          data?.results.length === 1 ? "result" : "results"
        }`}
      </div>

      {/* Results Grid */}
      <ResultsGrid
        results={data?.results || []}
        isLoading={isLoading && (!data || data.results.length === 0)}
      />

      {/* Details Modal */}
      {data?.results && <DetailsModal results={data.results} />}
    </>
  );
}
