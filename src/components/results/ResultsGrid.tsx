"use client";

import { TMDBResult } from "@/lib/types";
import { ResultCard } from "./ResultCard";
import { SkeletonCard } from "./SkeletonCard";

type ResultsGridProps = {
  results: TMDBResult[];
  isLoading?: boolean;
};

export function ResultsGrid({ results, isLoading = false }: ResultsGridProps) {
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 16,
  };

  if (isLoading) {
    return (
      <div style={gridStyle}>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div style={gridStyle}>
      {results.map((r, index) => (
        <ResultCard key={r.id} result={r} eager={index < 4} />
      ))}
    </div>
  );
}
