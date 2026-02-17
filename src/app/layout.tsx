import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-atkinson",
});

export const metadata: Metadata = {
  title: "ADHD HUB - Od ADHDowca dla ADHDowców",
  description: "Modularna platforma wspierająca codzienne funkcjonowanie osób neuroatypowych.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={`${atkinson.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/20 min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
