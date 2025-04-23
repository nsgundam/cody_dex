"use client"; // 🟡 ต้องมีเพราะใช้ useState/useEffect

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ⬅️ ใช้เพื่อรับ slug และ id

export default function Page() {
  const { slug, id } = useParams(); // 🟡 รับ slug และ id จาก URL param

  const [code, setCode] = useState();
  const [lessonContent, setLessonContent] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(`/api/contents/${slug}/${id}`);
        const data = await res.json();
        setLessonContent(data.content);
        setCode(data.starter_code || "<!-- Write your code here -->");
      } catch (error) {
        console.error("Failed to load lesson content:", error);
      }
    };

    if (slug && id) fetchLesson();
  }, [slug, id]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-cyan-900 text-white">
      {/* ซ้าย: เนื้อหาบทเรียน */}
      <aside className="bg-white text-black p-4 rounded shadow overflow-y-auto">
        <h2 className="text-xl font-bold font-mono mb-4">Lesson</h2>
        <div dangerouslySetInnerHTML={{ __html: lessonContent }} />
      </aside>

      {/* กลาง: Code Editor */}
      <main className="bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-bold font-mono mb-2">Write your code</h2>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-[300px] bg-black text-green-400 p-2 font-mono rounded"
        />
      </main>

      {/* ขวา: Output */}
      <div className="bg-white text-black p-4 rounded shadow">
        <h2 className="text-xl font-bold font-mono mb-2">Output</h2>
        <iframe
          className="w-full h-[300px] border border-gray-300"
          srcDoc={code}
          sandbox="allow-scripts"
          title="Live Output"
        />
      </div>
    </div>
  );
}
