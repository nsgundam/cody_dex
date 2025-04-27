import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

// GET
export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const [langRows] = await mysqlPool.query(
      "SELECT id FROM languages WHERE slug = ?",
      [slug]
    );

    if (langRows.length === 0) {
      return NextResponse.json({ error: "Language not found" }, { status: 404 });
    }

    const languageId = langRows[0].id;

    const [lessonRows] = await mysqlPool.query(
      "SELECT * FROM lessons WHERE languages_id = ?",
      [languageId]
    );

    return NextResponse.json(lessonRows);
    
  } catch (error) {
    console.error("Database error (GET /lessons):", error);
    return NextResponse.json({ error: "Failed to fetch lessons" }, { status: 500 });
  }
}

// POST
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, languages_id } = body;

    await mysqlPool.query(
      "INSERT INTO lessons (title, content, languages_id) VALUES (?, ?, ?)",
      [title, content, languages_id]
    );

    return NextResponse.json({ message: "Lesson created successfully" });
  } catch (error) {
    console.error("Database error (POST /lessons):", error);
    return NextResponse.json({ error: "Failed to create lesson" }, { status: 500 });
  }
}

// PUT
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, content, languages_id } = body;

    await mysqlPool.query(
      "UPDATE lessons SET title = ?, content = ?, languages_id = ? WHERE id = ?",
      [title, content, languages_id, id]
    );

    return NextResponse.json({ message: "Lesson updated successfully" });
  } catch (error) {
    console.error("Database error (PUT /lessons):", error);
    return NextResponse.json({ error: "Failed to update lesson" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    await mysqlPool.query(
      "DELETE FROM lessons WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    console.error("Database error (DELETE /lessons):", error);
    return NextResponse.json({ error: "Failed to delete lesson" }, { status: 500 });
  }
}
