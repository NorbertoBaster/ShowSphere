import { SkeletonCard } from "./SkeletonCard";

export function LoadingState() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 16,
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
