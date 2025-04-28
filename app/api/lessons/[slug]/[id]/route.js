// app/api/contents/[id]/route.js
import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

// GET (อ่านเนื้อหาบทเรียนตาม id)
export async function GET(_req, { params }) {
  const { id } = params; // id คือ ID ของ contents table

  try {
    const [rows] = await mysqlPool.query(
      "SELECT * FROM contents WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Database error (GET /contents/[id]):", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

// PUT (แก้ไขเนื้อหา)
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const body = await req.json();
    const { lesson_number, languages_id, content, exercise } = body;

    await mysqlPool.query(
      "UPDATE contents SET lesson_number = ?, languages_id = ?, content = ?, exercise = ? WHERE id = ?",
      [lesson_number, languages_id, content, exercise, id]
    );

    return NextResponse.json({ message: "Content updated successfully" });
  } catch (error) {
    console.error("Database error (PUT /contents/[id]):", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

// DELETE (ลบเนื้อหา)
export async function DELETE(_req, { params }) {
  const { id } = params;

  try {
    await mysqlPool.query(
      "DELETE FROM contents WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Database error (DELETE /contents/[id]):", error);
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
  }
}
