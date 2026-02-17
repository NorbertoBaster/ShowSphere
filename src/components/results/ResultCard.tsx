"use client";

import Image from "next/image";
import { TMDBResult } from "@/lib/types";
import { useSelectedResult } from "@/hooks/useSelectedResult";

type ResultCardProps = {
  result: TMDBResult;
  eager?: boolean; // for LCP optimization
};

export function ResultCard({ result, eager = false }: ResultCardProps) {
  const { select } = useSelectedResult();

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${result.title || result.name}`}
      onClick={() => select(result.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          select(result.id);
        }
      }}
      style={{
        cursor: "pointer",
        borderRadius: 6,
        overflow: "hidden",
        outline: "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "scale(1.05)";
        el.style.boxShadow = "0 8px 16px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "scale(1)";
        el.style.boxShadow = "none";
      }}
      onFocus={(e) => {
        const el = e.currentTarget;
        el.style.transform = "scale(1.05)";
        el.style.boxShadow = "0 8px 16px rgba(0,0,0,0.5)";
      }}
      onBlur={(e) => {
        const el = e.currentTarget;
        el.style.transform = "scale(1)";
        el.style.boxShadow = "none";
      }}
    >
      {result.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w342${result.poster_path}`}
          alt={result.title || result.name || "Poster"}
          width={200}
          height={300}
          loading={eager ? "eager" : "lazy"}
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </div>
  );
}
