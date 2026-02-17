import { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
