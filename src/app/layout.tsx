import type { Metadata } from "next";

import "vis-timeline/styles/vis-timeline-graph2d.css";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Líneas temporales de guerra y tecnología",
  description:
    "Visualización interactiva que compara conflicto geopolítico y cambio tecnológico entre 1914 y 2026."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
