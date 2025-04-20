"use client";

import { useEffect, useState } from "react";

export default function page() {
  const [languages, setLanguages] = useState([]);

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

      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4">HTML</h1>
      </section>
    </main>
  );
}
