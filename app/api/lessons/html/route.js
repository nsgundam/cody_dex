import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';

export async function GET() {
  try {
    const [rows] = await mysqlPool.execute(
      'SELECT * FROM lessons WHERE languages_id = ?',
      [1] 
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}
