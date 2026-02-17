import { ReactNode } from "react";

export function MainContent({ children }: { children: ReactNode }) {
  return (
    <main
      style={{
        flex: 1,
        padding: 24,
        overflowY: "auto",
      }}
    >
      {children}
    </main>
  );
}
