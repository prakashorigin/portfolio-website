import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Prakash Sharma | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    "Prakash Sharma",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Prakash Sharma" }],
  openGraph: {
    title: "Prakash Sharma | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
