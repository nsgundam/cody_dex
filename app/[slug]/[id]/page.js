"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; //  เพิ่ม useRouter มาด้วย

export default function Page() {
  const { slug, id } = useParams();
  const router = useRouter(); //  ใช้สำหรับเปลี่ยนหน้า
  const currentId = parseInt(id, 10); //  แปลง id จาก string เป็นตัวเลข

  const [code, setCode] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonExercise, setLessonExercise] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(`/api/lessons/${slug}/${id}`);
        const data = await res.json();
        setLessonContent(data.content || "");
        setLessonExercise(data.exercise || "");
        setCode(data.starter_code || "<-- Write your code here -->");
      } catch (error) {
        console.error("Failed to load lesson content:", error);
      }
    };

    if (slug && id) fetchLesson();
  }, [slug, id]);

  function goToPrevious() {
    if (currentId > 1) {
      router.push(`/${slug}/${currentId - 1}`);
    }
  }

  function goToNext() {
    router.push(`/${slug}/${currentId + 1}`);
  }

  return (
    <div className="min-h-screen flex flex-col bg-cyan-900 text-white">
      {/* 3 ส่วนหลัก */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 flex-grow">
        {/* ซ้าย: เนื้อหาบทเรียน */}
        <aside className="bg-white text-black p-4 rounded shadow overflow-y-auto">
          <h2 className="text-xl font-bold font-mono mb-4">Lesson</h2>
          <div dangerouslySetInnerHTML={{ __html: lessonContent }} />
          <br />
          <h2 className="text-xl font-bold font-mono mb-4">Exercise</h2>
          <div dangerouslySetInnerHTML={{ __html: lessonExercise }} />
        </aside>

        {/* กลาง: Code Editor */}
        <main className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-bold font-mono mb-2">Write your code</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-[1000px] bg-black text-green-400 p-2 font-mono rounded"
          />
        </main>

        {/* ขวา: Output */}
        <div className="bg-white text-black p-4 rounded shadow">
          <h2 className="text-xl font-bold font-mono mb-2">Output</h2>
          <iframe
            className="w-full h-[400px] border border-gray-300"
            srcDoc={code}
            sandbox="allow-scripts"
            title="Live Output"
          />
        </div>
      </div>

      {/* แถบปุ่มล่าง */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-900">
        <button
          onClick={goToPrevious}
          disabled={currentId === 1}
          className="bg-yellow-400 text-black font-mono px-4 py-2 rounded hover:bg-yellow-300 disabled:opacity-50"
        >
          ← Previous
        </button>

        <button
          onClick={goToNext}
          className="bg-yellow-400 text-black font-mono px-4 py-2 rounded hover:bg-yellow-300"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
