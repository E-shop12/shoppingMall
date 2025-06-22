"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import ProductDisplaySection from "@/sections/ProductDisplaySection";
import CategoryHeader from "@/components/CategoryHeader";
import SpinnerWithLogo from "@/components/stateComponents/SpinnerWithLogo";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoadedOnce");

    if (!hasLoaded) {
      // Show spinner on first visit in session
      const timer = setTimeout(() => {
        sessionStorage.setItem("hasLoadedOnce", "true");
        setLoading(false);
      }, 1500); // duration in ms

      return () => clearTimeout(timer);
    } else {
      // Skip spinner for subsequent visits
      setLoading(false);
    }
  }, []);

  useEffect(()=>{
    const handleScroll = () =>{
      const catHeader = document.getElementById("catHeader").offsetHeight;
      if (window.scrollY > catHeader) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
    window.addEventListener('scroll',handleScroll);

    return ()=> window.removeEventListener('scroll', handleScroll);

  },[])

  if (loading) {
    return <SpinnerWithLogo />;
  }

  const handleSearch = (query) =>{
    setSearchQuery(query);
  }

  return (
    <div className="p-1">
      <NavBar onSearch={handleSearch} />
      <div
        id="catHeader"
        className={`w-full z-20 flex items-center justify-center ${
          isSticky
            ? "fixed top-0 left-0 bg-white shadow-md transition-all duration-300"
            : "relative"
        }`}
      >
        <CategoryHeader />
      </div>
      <ProductDisplaySection searchQuery={searchQuery} />
    </div>
  );
}
