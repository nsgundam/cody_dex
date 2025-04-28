"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditLanguage({ params }) {
  const router = useRouter();
  const { id } = params;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [sampleCode, setSampleCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLanguage() {
      try {
        const res = await fetch(`/api/languages/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch language");
        }
        const data = await res.json();
        setName(data.name);
        setSlug(data.slug);
        setDescription(data.description);
        setSampleCode(data.sample_code);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load language data.");
      } finally {
        setLoading(false);
      }
    }

    fetchLanguage();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/languages`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, slug, description, sample_code: sampleCode }),
      });

      if (!res.ok) {
        throw new Error("Failed to update language");
      }

      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Failed to update language.");
    }
  }

  // ฟังก์ชันลบภาษา
  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this language?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/languages/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete language");
      }

      router.push("/admin"); // กลับหน้า admin หลังลบเสร็จ
    } catch (err) {
      console.error(err);
      setError("Failed to delete language.");
    }
  }

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-cyan-900 text-white">
      <h1 className="text-3xl font-bold mb-6 font-mono">Edit Language</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-lg font-mono">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-white text-black"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-lg font-mono">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-white text-black"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-mono">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full p-2 mt-1 rounded bg-white text-black"
            required
          />
        </div>

        {/* Sample Code */}
        <div>
          <label className="block text-lg font-mono">Sample Code</label>
          <textarea
            value={sampleCode}
            onChange={(e) => setSampleCode(e.target.value)}
            rows="6"
            className="w-full p-2 mt-1 rounded bg-white text-black"
            required
          />
        </div>

        {/* ปุ่ม Submit + ปุ่ม Delete */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded font-mono mt-4"
          >
            Update Language
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded font-mono mt-4"
          >
            Delete Language
          </button>
        </div>
      </form>
    </div>
  );
}
