import React from "react";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer/Footer";
// import NavBar from '@/pages/Navbar'
import { useRouter } from "next/router";
import BlurFade from "@/components/ui/blur-fade";
import BuySellDrawer from "@/component/BuySellDrawer/BuySellDrawer";
export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="main bg-image bg-cover bg-center min-w-screen">
        {children}
      </div>
      <div className="fixed bottom-[-10px] right-32 w-60 h-12 bg-headupb2b text-white shadow-lg flex items-center justify-center rounded-xl">
        <BuySellDrawer />
      </div>
      <Footer />
    </div>
  );
}
