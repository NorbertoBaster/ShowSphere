"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useSelectedResult } from "@/hooks/useSelectedResult";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { TMDBResult } from "@/lib/types";
import { tmdbFetch } from "@/lib/tmdb";

type Details = {
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
};

type DetailsModalProps = {
  results: TMDBResult[]; // needed for next/prev
};

export function DetailsModal({ results }: DetailsModalProps) {
  const resultsIds = results?.map((r) => r.id) || [];
  const { selectedId, clear, selectNext, selectPrev } = useSelectedResult(resultsIds);
  const { state } = useSearchParamsState();
  const modalRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<Details | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  // Animate modal visibility
  useEffect(() => setVisible(!!selectedId), [selectedId]);

  // Keyboard navigation: ESC + arrows + focus trap
  useEffect(() => {
    if (!selectedId) return;

    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalRef.current) return;

      if (e.key === "Escape") {
        setVisible(false);
        setTimeout(clear, 300);
      }

      if (e.key === "ArrowRight") selectNext();
      if (e.key === "ArrowLeft") selectPrev();

      // Focus trap
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, clear, selectNext, selectPrev]);

  // Fetch TMDB details
  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        setData(null);

        const result = await tmdbFetch<Details>(`/${state.type}/${selectedId}`);

        if (!cancelled) setData(result);
      } catch {
        if (!cancelled) setError("Failed to load details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [selectedId, state.type]);

  if (!selectedId) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={() => {
        setVisible(false);
        setTimeout(clear, 300);
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: visible ? "rgba(0,0,0,0.7)" : "transparent",
        backdropFilter: visible ? "blur(4px)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(900px, 90vw)",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#111",
          borderRadius: 8,
          padding: 24,
          color: "white",
          display: "flex",
          flexDirection: "row",
          gap: 24,
          flexWrap: "wrap",
          transform: visible ? "translateY(0)" : "translateY(-20px)",
          opacity: visible ? 1 : 0,
          transition: "all 0.3s ease",
        }}
      >
        {loading && <p>Loading…</p>}
        {error && <p>{error}</p>}
        {data && (
          <>
            {data.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                alt={data.title || data.name || "Poster"}
                width={200}
                height={300}
                style={{ borderRadius: 6, objectFit: "cover" }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 id="modal-title">{data.title || data.name}</h2>
              <p id="modal-description">{data.overview}</p>
              <p>⭐ {data.vote_average.toFixed(1)}</p>
              <p>{data.release_date || data.first_air_date}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
