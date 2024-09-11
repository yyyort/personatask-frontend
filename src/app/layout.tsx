import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import HomeWrapper from "./home-wrapper";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange 
        >
          <HomeWrapper>{children}</HomeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
