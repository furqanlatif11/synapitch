import { Urbanist } from "next/font/google";
import "../globals.css";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import BackToTopButton from "./_components/backtotop";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-exo-2",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={urbanist.variable}>
      <head>
        <>
          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />

          {/* Google Tag Manager */}
        </>
      </head>

      <body className="antialiased">
        {/* Google Tag Manager (noscript fallback) */}
        <Navbar />
        {children}
        <Footer />

        <BackToTopButton />
      </body>
    </html>
  );
}
