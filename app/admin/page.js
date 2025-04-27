"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminLanguages() {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetchLanguages();
  }, []);

  // Fetch Languages
  async function fetchLanguages() {
    try {
      const res = await fetch("/api/languages");
      const data = await res.json();
      setLanguages(data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  }


  return (
    <div className="min-h-screen p-8 bg-cyan-900 text-white">
      <h1 className="text-3xl font-bold mb-6 font-mono">Admin: Manage Languages</h1>

      <Link href="/admin/add-language" className="bg-green-500 text-white px-4 py-2 rounded mb-6 inline-block font-mono">
        Add New Language
      </Link>

      <table className="w-full bg-white text-black rounded overflow-hidden mt-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Language</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {languages.map((language) => (
            <tr key={language.id} className="border-t">
              <td className="p-3">{language.id}</td>
              <td className="p-3">{language.name}</td>
              <td className="p-3 flex gap-2 justify-center">
                <Link
                  href={`/admin/edit-language/${language.id}`}
                  className="bg-yellow-400 text-black px-3 py-1 rounded font-mono"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
