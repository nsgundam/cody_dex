import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request) {
  try {
    const promisePool = mysqlPool.promise();
    const [rows] = await promisePool.query(`SELECT * FROM languages;`);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch languages" }, { status: 500 });
  }
}
