import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

// GET
export async function GET(request, { params }) {
  const { slug, id } = params;

  try {
    
    const [languages] = await mysqlPool.query(
      "SELECT id FROM languages WHERE slug = ?",
      [slug]
    );
    if (languages.length === 0) {
      return NextResponse.json({ error: "Language not found" }, { status: 404 });
    }
    const languageId = languages[0].id;

    const [lessons] = await mysqlPool.query(
      "SELECT * FROM lessons WHERE id = ? AND languages_id = ?",
      [id, languageId]
    );
    if (lessons.length === 0) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }
    return NextResponse.json(lessons[0]);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch lesson" }, { status: 500 });
  }
}

// POST
export async function POST(request) {
  try {
    const body = await request.json();
    const { lesson_number, languages_id, content, exercise } = body;

    await mysqlPool.query(
      "INSERT INTO contents (lesson_number, languages_id, content, exercise) VALUES (?, ?, ?, ?)",
      [lesson_number, languages_id, content, exercise]
    );

    return NextResponse.json({ message: "Content created successfully" });
  } catch (error) {
    console.error("Database error (POST /contents):", error);
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 });
  }
}

// PUT
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, lesson_number, languages_id, content, exercise } = body;

    await mysqlPool.query(
      "UPDATE contents SET lesson_number = ?, languages_id = ?, content = ?, exercise = ? WHERE id = ?",
      [lesson_number, languages_id, content, exercise, id]
    );

    return NextResponse.json({ message: "Content updated successfully" });
  } catch (error) {
    console.error("Database error (PUT /contents):", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    await mysqlPool.query(
      "DELETE FROM contents WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Database error (DELETE /contents):", error);
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
  }
}
