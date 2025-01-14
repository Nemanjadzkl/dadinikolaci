import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { orderDetails, customerEmail, customerDetails } = req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zaaaastava@gmail.com',
      pass: 'nfhh uuer prhu zmbx'
    }
  })
  

  const orderItemsHtml = orderDetails.items.map(item => `
    <tr>
      <td style="padding: 10px;">${item.name}</td>
      <td style="padding: 10px;">${item.quantity}</td>
      <td style="padding: 10px;">${item.price} RSD</td>
      <td style="padding: 10px;">${item.price * item.quantity} RSD</td>
    </tr>
  `).join('')

  const mailOptions = {
    from: '"Dadini Kolači" <zaaaastava@gmail.com>',
    to: customerEmail,
    subject: 'Potvrda porudžbine - Dadini Kolači',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #d4af37; text-align: center;">Hvala na porudžbini!</h1>
        <p>Vaša porudžbina je uspešno primljena.</p>
        
        <h2>Detalji porudžbine:</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f8f8f8;">
              <th style="padding: 10px; text-align: left;">Proizvod</th>
              <th style="padding: 10px;">Količina</th>
              <th style="padding: 10px;">Cena</th>
              <th style="padding: 10px;">Ukupno</th>
            </tr>
          </thead>
          <tbody>
            ${orderItemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 10px; text-align: right;"><strong>Dostava:</strong></td>
              <td style="padding: 10px;">300 RSD</td>
            </tr>
            <tr>
              <td colspan="3" style="padding: 10px; text-align: right;"><strong>Ukupno:</strong></td>
              <td style="padding: 10px;"><strong>${orderDetails.total} RSD</strong></td>
            </tr>
          </tfoot>
        </table>

        <h2>Podaci za dostavu:</h2>
        <p>Ime i prezime: ${customerDetails.name}</p>
        <p>Adresa: ${customerDetails.address}</p>
        <p>Grad: ${customerDetails.city}</p>
        <p>Poštanski broj: ${customerDetails.postalCode}</p>
        <p>Telefon: ${customerDetails.phone}</p>
        ${customerDetails.notes ? `<p>Napomena: ${customerDetails.notes}</p>` : ''}

        <div style="margin-top: 20px; padding: 20px; background-color: #f8f8f8; text-align: center;">
          <p>Kontaktiraćemo vas uskoro radi potvrde porudžbine.</p>
          <p>Za sva pitanja, možete nas kontaktirati na <a href="mailto:zaaaastava@gmail.com">zaaaastava@gmail.com</a></p>
        </div>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Email sending error:', error)
    res.status(500).json({ message: 'Failed to send email' })
  }
}
