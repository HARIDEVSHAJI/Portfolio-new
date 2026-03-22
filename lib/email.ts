import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'haridevshaji@gmail.com',
    replyTo: email,
    subject: `Portfolio Contact: Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 12px;">
        <h2 style="color: #00d4ff; margin-bottom: 8px;">New Message from Portfolio</h2>
        <div style="background: #1a1a2e; padding: 24px; border-radius: 8px; border-left: 4px solid #00d4ff;">
          <p style="margin: 0 0 8px;"><strong style="color: #00d4ff;">Name:</strong> ${name}</p>
          <p style="margin: 0 0 8px;"><strong style="color: #00d4ff;">Email:</strong> <a href="mailto:${email}" style="color: #a78bfa;">${email}</a></p>
          <p style="margin: 0 0 8px;"><strong style="color: #00d4ff;">Message:</strong></p>
          <p style="margin: 0; line-height: 1.7; color: #94a3b8;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        <p style="color: #475569; font-size: 12px; margin-top: 24px;">Sent via haridev.dev portfolio contact form</p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}
