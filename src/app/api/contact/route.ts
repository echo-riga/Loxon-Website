import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { sendContactNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    // 1. Save to database
    const result = await pool.query(
      `INSERT INTO contact_submissions (name, email, subject, message)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [name, email, subject || null, message]
    )

    // 2. Send email notification via Resend (non-blocking)
    try {
      await sendContactNotification({ name, email, subject, message })
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the whole request – still return success to the user
    }

    return NextResponse.json({ success: true, id: result.rows[0].id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}