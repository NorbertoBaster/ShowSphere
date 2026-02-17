"use client";

import { useSearchParamsState } from "./useSearchParamsState";

/**
 * Hook to manage selected result (for modal navigation).
 * Accepts an optional array of IDs for next/prev navigation.
 */
export function useSelectedResult(resultsIds?: number[]) {
  const { state, setState } = useSearchParamsState();

  const selectedId =
    typeof state.selected === "string" ? Number(state.selected) : null;

  const select = (id: number) => {
    setState((prev) => ({
      ...prev,
      selected: String(id),
    }));
  };

  const clear = () => {
    setState((prev) => {
      const { selected, ...rest } = prev;
      return rest;
    });
  };

  const selectNext = (ids: number[] = resultsIds || []) => {
    if (!selectedId || ids.length === 0) return;
    const idx = ids.indexOf(selectedId);
    const next = ids[(idx + 1) % ids.length];
    select(next);
  };

  const selectPrev = (ids: number[] = resultsIds || []) => {
    if (!selectedId || ids.length === 0) return;
    const idx = ids.indexOf(selectedId);
    const prev = ids[(idx - 1 + ids.length) % ids.length];
    select(prev);
  };

  return { selectedId, select, clear, selectNext, selectPrev };
}
