import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactNotification(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const htmlContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Subject:</strong> ${data.subject || 'No subject'}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
  `

  await resend.emails.send({
    // In development, you can use the default "onboarding@resend.dev".
    // In production, verify your domain and replace with your own address.
    from: 'Loxon Philippines <onboarding@resend.dev>',
    to: [process.env.CONTACT_EMAIL_TO!],
    replyTo: data.email,
    subject: `Contact Form: ${data.subject || 'New message'} from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
    html: htmlContent,
  })
}