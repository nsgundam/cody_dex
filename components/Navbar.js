"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const res = await fetch("/api/languages");
      const data = await res.json();
      setLanguages(data);
    };
    fetchLanguages();
  }, []);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-xl text-yellow-400 font-mono font-bold">
            CODYDEX
          </div>
        </Link>

        <div className="relative group hidden md:flex space-x-6 text-lg font-medium">
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="font-mono cursor-pointer hover:text-yellow-400 transition">
              Explore Lessons
            </div>
            {showDropdown && (
              <div className="absolute top-full mt-0 left-0 bg-white text-black rounded shadow-lg z-10 w-48">
                {languages.map((lang) => (
                  <Link
                    key={lang.slug}
                    href={`/${lang.slug}`}
                    className="block px-4 py-2 hover:bg-yellow-100 hover:text-yellow-500"
                  >
                    {lang.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a href="#" className="font-mono hover:text-yellow-400 transition">
            Practice Coding
          </a>
        </div>
      </div>
    </nav>
  );
}
