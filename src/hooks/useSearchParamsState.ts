"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { parseSearchParams, serializeSearchState } from "@/lib/url";
import type { SearchState } from "@/lib/types";
import { DEFAULT_STATE } from "@/lib/defaults";

export function useSearchParamsState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const state: SearchState = useMemo(() => {
    const parsed = parseSearchParams(searchParams);
    return {
      ...DEFAULT_STATE,
      ...parsed,
    };
  }, [searchParams]);

  const setState = useCallback(
    (updater: SearchState | ((prev: SearchState) => SearchState)) => {
      // 🔥 Re-parse current params instead of relying on stale closure
      const current = {
        ...DEFAULT_STATE,
        ...parseSearchParams(searchParams),
      };

      const next =
        typeof updater === "function" ? updater(current) : updater;

      const params = serializeSearchState(next);

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams] // ❗ NOT state
  );

  return { state, setState };
}
