import { Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "react-toastify";

const inter= Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "KIN — Small acts. Lasting impact",
  description: "Discover local events, connect with your community, and make a difference together.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        <ThemeProvider>
        <Navbar />
        {children}
        <ToastContainer />
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
