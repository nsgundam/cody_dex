"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditLanguage({ params }) {
  const { id } = params; 
  const router = useRouter();

  const [language, setLanguage] = useState(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [sampleCode, setSampleCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLanguageData();
  }, [id]);

  async function fetchLanguageData() {
    try {
      const res = await fetch(`/api/languages/${id}`); 
      const data = await res.json();
      if (data) {
        setLanguage(data);
        setName(data.name);
        setSlug(data.slug);
        setDescription(data.description);
        setSampleCode(data.sample_code);
      }
    } catch (error) {
      console.error("Error fetching language:", error);
      setError("Failed to fetch language data");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await fetch(`/api/languages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          slug,
          description,
          sample_code: sampleCode,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.error || "Failed to update language");
      }
    } catch (error) {
      console.error("Error updating language:", error);
      setError("Failed to update language");
    }
  }

  // ✅ ฟังก์ชันลบภาษา
  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this language?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/languages/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin"); // กลับไปหน้า admin
      } else {
        setError(data.error || "Failed to delete language");
      }
    } catch (error) {
      console.error("Error deleting language:", error);
      setError("Failed to delete language");
    }
  }

  if (!language) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-cyan-900 text-white">
      <h1 className="text-3xl font-bold mb-6 font-mono">Edit Language: {language.name}</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-mono">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-white text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-lg font-mono">Slug</label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-white text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-mono">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-white text-black"
            rows="4"
            required
          />
        </div>

        <div>
          <label htmlFor="sampleCode" className="block text-lg font-mono">Sample Code</label>
          <textarea
            id="sampleCode"
            value={sampleCode}
            onChange={(e) => setSampleCode(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-white text-black"
            rows="6"
            required
          />
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded font-mono hover:bg-green-400"
          >
            Update Language
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded font-mono hover:bg-red-400"
          >
            Delete Language
          </button>
        </div>
      </form>
    </div>
  );
}
