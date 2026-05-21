import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { sendContactNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message, inquiryType } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    // Save to database, including inquiry_type
    const result = await pool.query(
      `INSERT INTO contact_submissions (name, email, subject, message, inquiry_type)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [name, email, subject || null, message, inquiryType || 'sales']
    )

    // Send email notification with inquiry type
    try {
      await sendContactNotification({ name, email, subject, message, inquiryType: inquiryType || 'sales' })
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
    }

    return NextResponse.json({ success: true, id: result.rows[0].id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}