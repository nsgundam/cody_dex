import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request, { params }) {
  const { slug } =await params;

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
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch lessons" }, { status: 500 });
  }
}
