import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";


export async function GET(request, { params }) {
  const { id } = params;

  try {
    const [rows] = await mysqlPool.query(
      "SELECT * FROM contents WHERE lesson_number = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Lesson content not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]); 
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}
