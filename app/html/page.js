"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    async function fetchLessons() {
      try {
        const res = await fetch("/api/lessons/html");
        const data = await res.json();
        console.log("✅ Fetched lessons:", data); // 🔍 ดูว่าได้อะไรจริงๆ
        setLessons(data);
      } catch (err) {
        console.error("Error loading lessons:", err);
        setLessons([]); // fallback
      }
    }

    fetchLessons();
  }, []);

  return (
    <main className="bg-cyan-900 text-white min-h-screen">
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4">HTML</h1>
        <p className="font-mono text-lg">
          Here we'll start from 0, so let's go!!!
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-10 bg-white text-black rounded-lg shadow-md">
        <h2 className="text-2xl font-mono font-bold mb-6">Lessons</h2>
        <ul className="space-y-4">
          {Array.isArray(lessons) ? (
            lessons.map((lesson) => (
              <li key={lesson.id} className="border-b pb-2">
                <Link href={`/html/${lesson.id}`}>
                  <span className="text-lg font-mono font-medium hover:underline cursor-pointer">
                    {lesson.title}
                  </span>
                  <p className=" font-mono ">{lesson.content}</p>
                </Link>
              </li>
            ))
          ) : (
            <p className="text-red-400">ไม่สามารถโหลดบทเรียนได้</p>
          )}
        </ul>
      </section>
    </main>
  );
}
