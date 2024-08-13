import Image from "next/image";
import { Inter } from "next/font/google";
import HeroSection from "../Components/HeroSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="bg-[rgb(18,20,22)] min-h-screen flex items-center justify-center">
      <HeroSection/>
    </main>
  );
}
