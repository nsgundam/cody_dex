"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddLanguage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [sampleCode, setSampleCode] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const languageData = { name, slug, description, sample_code: sampleCode };

    try {
      const res = await fetch("/api/languages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(languageData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Language added successfully");
        router.push("/admin/languages"); // ไปยังหน้าแสดงภาษาหลังจากเพิ่ม
      } else {
        alert(data.error || "Failed to add language");
      }
    } catch (error) {
      console.error("Error adding language:", error);
    }
  }

  return (
    <div className="min-h-screen p-8 bg-cyan-900 text-white">
      <h1 className="text-3xl font-bold mb-6 font-mono">Add New Language</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-mono">Language Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 rounded bg-white"
          />
        </div>

        <div>
          <label className="block text-lg font-mono">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full p-3 rounded bg-white"
          />
        </div>

        <div>
          <label className="block text-lg font-mono">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 rounded bg-white"
          />
        </div>

        <div>
          <label className="block text-lg font-mono">Sample Code</label>
          <textarea
            value={sampleCode}
            onChange={(e) => setSampleCode(e.target.value)}
            required
            className="w-full p-3 rounded bg-white"
          />
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded font-mono">
          Add Language
        </button>
      </form>
    </div>
  );
}
