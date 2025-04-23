"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [lessons, setLessons] = useState([]);
  const { slug } = useParams(); 

  useEffect(() => {
    async function fetchLessons() {
      try {
        const res = await fetch(`/api/lessons/${slug}`);
        const data = await res.json();
        setLessons(data);
      } catch (err) {
        console.error("Error loading lessons:", err);
        setLessons([]);
      }
    }

    if (slug) {
      fetchLessons();
    }
  }, [slug]); 

  return (

    // Header section ใช้สำหรับโชว์ชื่อภาษาที่ผู้ใช้งานเข้ามาใช้
    <main className="bg-cyan-900 text-white min-h-screen">
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4 uppercase">
          {slug}
        </h1>
        <p className="font-mono text-lg">
          Here we'll start from 0, so let's go!!!
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-10 bg-white text-black rounded-lg shadow-md">
        <h2 className="text-2xl font-mono font-bold mb-6">Lessons</h2>
        <ul className="space-y-4">
          {Array.isArray(lessons) && lessons.length > 0 ? (
            lessons.map((lesson) => (
              <li key={lesson.id} className="border-b pb-2">
                <Link href={`/${slug}/${lesson.id}`}>
                  <span className="text-lg font-mono font-medium hover:underline cursor-pointer">
                    {lesson.title}
                  </span>
                  <p className="text-sm text-gray-700 font-mono">
                    {lesson.content.slice(0, 100)}...
                  </p>
                </Link>
              </li>
            ))
          ) : (
            <p className="text-red-400">Can not find content</p>
          )}
        </ul>
      </section>
    </main>
  );
}
