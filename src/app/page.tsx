"use client";

import { TopBar } from "../components/layout/TopBar";
import { Sidebar } from "../components/layout/Sidebar";
import { Results } from "../components/results/Results";

export default function Page() {
  return (
    <>
      <TopBar />

      <div style={{ display: "flex", gap: 24, padding: "24px" }}>
        <Sidebar />

        <div style={{ flex: 1 }}>
          <Results />
        </div>
      </div>
    </>
  );
}
