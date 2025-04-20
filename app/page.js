"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
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
        <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4">
          Let's learn code with <span className="text-yellow-400">CODYDEX</span>
        </h1>
        <p className="text-lg text-gray-300 font-mono max-w-2xl mx-auto">
          Code, Practice, Build, Your developer journey starts here 🌱
        </p>
      </section>

      {languages.map((lang) => (
        <LanguageSection key={lang.slug} language={lang} />
      ))}
    </main>
  );
}

function LanguageSection({ language }) {
  const bgColorMap = {
    html: "bg-green-100",
    css: "bg-yellow-100",
    javascript: "bg-blue-100",
    java: "bg-purple-100",
    python: "bg-pink-200",
  };
  return (
    <section className={`${bgColorMap[language.slug] || "bg-gray-100"} py-16`}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-6">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-mono font-bold text-black mb-2">
            {language.name}
          </h2>
          <p className="text-black font-mono mb-4">{language.description}</p>
          <Link href={`/${language.slug}`}>
            <button className="bg-green-500 text-white font-mono px-4 py-2 rounded">
              Learn {language.name}
            </button>
          </Link>
        </div>

        <div className="bg-white rounded shadow-lg p-6">
          <pre className="text-left text-sm text-gray-800 overflow-x-auto">
            <code>{language.sample_code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
