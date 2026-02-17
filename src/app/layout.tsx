import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#0b0b0b",
          color: "#f5f5f5",
        }}
      >
        {children}
      </body>
    </html>
  );
}
