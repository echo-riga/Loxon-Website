import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { sendJobApplicationNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { job_id, full_name, email, phone, cover_letter, resume_url } = await request.json()

    if (!full_name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Get job title for the email
    let jobTitle = 'Unknown Position'
    if (job_id) {
      const jobRes = await pool.query('SELECT title FROM jobs WHERE id = $1', [job_id])
      if (jobRes.rows[0]) jobTitle = jobRes.rows[0].title
    }

    // Insert into database
    const result = await pool.query(
      `INSERT INTO job_applications (job_id, full_name, email, phone, cover_letter, resume_url)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [job_id || null, full_name, email, phone || null, cover_letter || null, resume_url || null]
    )

    // Send email notification (non-blocking – errors won't break the submission)
    try {
      await sendJobApplicationNotification({
        job_title: jobTitle,
        full_name,
        email,
        phone,
        cover_letter,
        resume_url,
      })
    } catch (emailError) {
      console.error('Failed to send job application email:', emailError)
      // Don't fail the request – application is already saved
    }

    return NextResponse.json({ success: true, id: result.rows[0].id })
  } catch (error) {
    console.error('Job application error:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}