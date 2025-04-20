import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET() {
  try {
    const [rows] = await mysqlPool.query(`SELECT * FROM languages`);

    if (!Array.isArray(rows)) {
      return NextResponse.json({ error: "Unexpected response from database" }, { status: 500 });
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error("❌ Database error in /api/languages:", error);
    return NextResponse.json({ error: "Failed to fetch languages" }, { status: 500 });
  }
}
