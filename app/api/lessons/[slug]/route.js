import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';

export async function GET(_req, { params }) {
  const { slug } = params;

  try {
    // ค้นหาภาษาด้วย slug เช่น "html"
    const [langRows] = await mysqlPool.query(
      'SELECT id FROM languages WHERE slug = ?',
      [slug]
    );

    if (langRows.length === 0) {
      return NextResponse.json({ error: 'Language not found' }, { status: 404 });
    }

    const languageId = langRows[0].id;

    // ค้นหาบทเรียนทั้งหมดของภาษานั้น
    const [lessonRows] = await mysqlPool.query(
      'SELECT * FROM lessons WHERE languages_id = ?',
      [languageId]
    );

    return NextResponse.json(lessonRows);
  } catch (error) {
    console.error("❌ Error fetching lessons by slug:", error);
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}
