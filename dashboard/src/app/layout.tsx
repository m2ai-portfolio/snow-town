import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Snow-Town Dashboard",
  description: "Ecosystem visualization for the Snow-Town feedback loop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Sidebar />
        <div className="ml-56">
          <Header />
          <main className="pt-12 min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
