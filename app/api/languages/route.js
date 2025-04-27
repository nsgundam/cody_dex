import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

//  GET 
export async function GET() {
  try {
    const [rows] = await mysqlPool.query(`SELECT * FROM languages`);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error (GET /languages):", error);
    return NextResponse.json({ error: "Failed to fetch languages" }, { status: 500 });
  }
}

// POST 
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, slug, description, sample_code } = body;

    await mysqlPool.query(
      `INSERT INTO languages (name, slug,description, sample_code) VALUES (?, ?, ?, ?)`,
      [name, slug, description, sample_code]
    );

    return NextResponse.json({ message: "Language created successfully" });
  } catch (error) {
    console.error("Database error (POST /languages):", error);
    return NextResponse.json({ error: "Failed to create language" }, { status: 500 });
  }
}

// PUT 
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, slug, description, sample_code } = body;

    await mysqlPool.query(
      `UPDATE languages SET name = ?, slug = ?, description = ?, sample_code = ? WHERE id = ?`,
      [name, slug, description, sample_code, id]
    );

    return NextResponse.json({ message: "Language updated successfully" });
  } catch (error) {
    console.error("Database error (PUT /languages):", error);
    return NextResponse.json({ error: "Failed to update language" }, { status: 500 });
  }
}

// DELETE 
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    await mysqlPool.query(
      `DELETE FROM languages WHERE id = ?`,
      [id]
    );

    return NextResponse.json({ message: "Language deleted successfully" });
  } catch (error) {
    console.error("Database error (DELETE /languages):", error);
    return NextResponse.json({ error: "Failed to delete language" }, { status: 500 });
  }
}
