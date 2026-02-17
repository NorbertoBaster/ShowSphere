"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { buildDiscoverParams } from "@/lib/buildDiscoverParams";
import { tmdbFetch } from "@/lib/tmdb";
import { TMDBDiscoverResponse } from "@/lib/tmdbTypes";

type Status = "idle" | "loading" | "success" | "error";

export function useDiscoverQuery() {
  const { state } = useSearchParamsState();

  const [data, setData] = useState<TMDBDiscoverResponse | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // ✅ Create ONE stable serialized key
  const filterKey = useMemo(() => JSON.stringify(state), [state]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setStatus("loading");
        setError(null);

        // 🔥 Parse state from filterKey (no outer variable usage)
        const {
          query,
          type,
          genres,
          sort,
          year,
          rating,
        } = JSON.parse(filterKey);

        const endpoint =
          query?.trim().length > 0
            ? type === "movie"
              ? "/search/movie"
              : "/search/tv"
            : type === "movie"
            ? "/discover/movie"
            : "/discover/tv";

        const params = {
          ...buildDiscoverParams({ query, type, genres, sort, year, rating }),
        };

        if (endpoint.startsWith("/search") && query?.trim().length > 0) {
          params.query = query.trim();
        }

        const response = await tmdbFetch<TMDBDiscoverResponse>(
          endpoint,
          params
        );

        if (!controller.signal.aborted) {
          setData(response);
          setStatus("success");
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setStatus("error");
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, [filterKey]); // ✅ Single dependency, ESLint happy

  return { data, status, error };
}
