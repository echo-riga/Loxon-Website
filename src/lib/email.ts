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
    from: 'Loxon Philippines <onboarding@resend.dev>', // or your verified domain
    to: [process.env.CONTACT_EMAIL_TO || 'rigaecho@gmail.com'],
    replyTo: data.email,
    subject: `Contact Form: ${data.subject || 'New message'} from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
    html: htmlContent,
  })
}

export async function sendJobApplicationNotification(data: {
  job_title: string
  full_name: string
  email: string
  phone?: string
  cover_letter?: string
  resume_url?: string
}) {
  const htmlContent = `
    <h2>New Job Application</h2>
    <p><strong>Position:</strong> ${data.job_title}</p>
    <p><strong>Name:</strong> ${data.full_name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    <p><strong>Cover Letter / Message:</strong></p>
    <p>${(data.cover_letter || 'No cover letter provided').replace(/\n/g, '<br>')}</p>
    <p><strong>Resume URL:</strong> ${data.resume_url ? `<a href="${data.resume_url}">${data.resume_url}</a>` : 'Not provided'}</p>
  `

  await resend.emails.send({
    from: 'Loxon Philippines <onboarding@resend.dev>', // or your verified domain
    to: [process.env.JOBS_EMAIL_TO || 'rigaecho@gmail.com'], // separate env var
    replyTo: data.email,
    subject: `Job Application: ${data.job_title} - ${data.full_name}`,
    text: `Position: ${data.job_title}\nName: ${data.full_name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\n\nCover Letter:\n${data.cover_letter || 'N/A'}\n\nResume URL: ${data.resume_url || 'N/A'}`,
    html: htmlContent,
  })
}