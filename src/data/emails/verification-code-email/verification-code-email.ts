import ejs from 'ejs';
import { BaseEmail } from '../base-email';
const html = `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your e-mail address</title>
  </head>
  <body>
		<p>Hello</p>
		<p>Thank you for starting an application with AVCDOLOAN.</p>
		<p>Use this verification code to confirm your e-mail address</p>
    <p><%= code %></p>
  <footer>
    <p>Best regards,</p>
    <p>AVCDOLOAN Admin Team</p>
  </footer>
  </body>
  </html>
`

class VerificationCodeEmail extends BaseEmail {
  constructor(recipient: string, code: string) {
    const subject: string = "AVCDOLOAN Verify your E-mail address";
    const htmlBody = {
      html: ejs.render(html, { code: code }),
      text:
      `
      Hello ${name}
      Thank you for starting an application with AVCDOLOAN.
      Use this verification code to confirm your e-mail address

      ${code}
      
      Best regards,
      AVCDOLOAN Admin Team
      `
    }
    super(recipient, subject, htmlBody)
  }
}

export default VerificationCodeEmail;
