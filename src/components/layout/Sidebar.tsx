import { SortSelect } from "@/components/filters/SortSelect";
import { GenreFilter } from "@/components/filters/GenreFilter";
import { ClearFilters } from "@/components/filters/ClearFilters";

export function Sidebar() {
  return (
    <aside
      style={{
        width: 260,
        borderRight: "1px solid #222",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <h3 style={{ margin: 0 }}>Filters</h3>

      <SortSelect />
      <GenreFilter />
      <ClearFilters />
    </aside>
  );
}
