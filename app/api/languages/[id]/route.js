import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

// GET /api/languages/:id
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const [rows] = await mysqlPool.query(
      "SELECT * FROM languages WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Language not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]); // ✅ ส่งข้อมูลภาษาที่เจอ
  } catch (error) {
    console.error("Database error (GET /languages/:id):", error);
    return NextResponse.json({ error: "Failed to fetch language" }, { status: 500 });
  }
}

// (เลือกได้) DELETE /api/languages/:id
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await mysqlPool.query(
      "DELETE FROM languages WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Language deleted successfully" });
  } catch (error) {
    console.error("Database error (DELETE /languages/:id):", error);
    return NextResponse.json({ error: "Failed to delete language" }, { status: 500 });
  }
}
