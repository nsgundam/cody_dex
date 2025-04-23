import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET() {
  try {
    const [rows] = await mysqlPool.query(`SELECT * FROM languages`);

    return NextResponse.json(rows);

  } catch (error) {
    console.error("Database error in /api/languages:", error);
    return NextResponse.json({ error: "Failed to fetch languages" }, { status: 500 });
  }
}
