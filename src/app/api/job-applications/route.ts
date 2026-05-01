import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { job_id, full_name, email, phone, cover_letter, resume_url } = await request.json()

    if (!full_name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const result = await pool.query(
      `INSERT INTO job_applications (job_id, full_name, email, phone, cover_letter, resume_url)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [job_id || null, full_name, email, phone || null, cover_letter || null, resume_url || null]
    )

    return NextResponse.json({ success: true, id: result.rows[0].id })
  } catch (error) {
    console.error('Job application error:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}