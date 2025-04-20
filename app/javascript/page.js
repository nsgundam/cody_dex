"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
  const [languages, setLanguages] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch("/api/languages");
        const data = await res.json();
        setLanguages(data);
      } catch (err) {
        console.error("Failed to fetch languages:", err);
      }
    };
    fetchLanguages();
  }, []);

  return (
    <main className="bg-cyan-900 text-white min-h-screen">
      <nav className="bg-gray-900 text-white px-6 py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <div className="text-xl text-yellow-400 font-mono font-bold">
              CODY DEX
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

      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4">
          JavaScript
        </h1>
      </section>

      <footer className="bg-gray-900 text-gray-400 text-sm py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono">© 2025 CODY DEX. All rights reserved.</p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/nurunat.suttibutr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition"
            >
              Facebook
            </a>
            <a
              href="https://github.com/nsgundam"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition"
            >
              GitHub
            </a>
            <a
              href="mailto:narunat.su66@rsu.ac.th"
              className="hover:text-yellow-400 transition"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
