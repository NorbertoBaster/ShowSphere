"use client";

export function SkeletonCard() {
  return (
    <div
      style={{
        width: 200,
        height: 300,
        borderRadius: 6,
        backgroundColor: "#1a1a1a",
        animation: "pulse 1.5s infinite ease-in-out",
        pointerEvents: "none",
      }}
    />
  );
}
