export function EmptyState() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.6,
        gap: 8,
      }}
    >
      <p>Search for a movie or TV show</p>
      <p style={{ fontSize: 12 }}>
        Use filters or keyboard shortcuts to refine results
      </p>
    </div>
  );
}
