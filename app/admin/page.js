"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetchLessons();
  }, []);

  async function fetchLessons() {
    try {
      const res = await fetch("/api/admin/lessons");
      const data = await res.json();
      setLessons(data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  }

  async function deleteLesson(id) {
    if (confirm("Are you sure you want to delete this lesson?")) {
      await fetch(`/api/admin/lessons/${id}`, {
        method: "DELETE",
      });
      fetchLessons(); // โหลดใหม่หลังลบ
    }
  }

  return (
    <div className="min-h-screen p-8 bg-cyan-900 text-white">
      <h1 className="text-3xl font-bold mb-6 font-mono">Admin: Manage Lessons</h1>

      <Link href="/admin/add" className="bg-green-500 text-white px-4 py-2 rounded mb-6 inline-block font-mono">
        Add New Lesson
      </Link>

      <table className="w-full bg-white text-black rounded overflow-hidden mt-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Language</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id} className="border-t">
              <td className="p-3">{lesson.id}</td>
              <td className="p-3">{lesson.title}</td>
              <td className="p-3">{lesson.language_name}</td>
              <td className="p-3 flex gap-2 justify-center">
                <Link
                  href={`/admin/edit/${lesson.id}`}
                  className="bg-yellow-400 text-black px-3 py-1 rounded font-mono"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteLesson(lesson.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded font-mono"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
