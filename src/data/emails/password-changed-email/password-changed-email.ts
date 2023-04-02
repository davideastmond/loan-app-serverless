import { BaseEmail } from "../base-email";
import ejs from "ejs";
const html: string =`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AVCDOLOAN Account Password Changed</title>
  </head>
  <body>
    <p>Hello, <%= name %></p>
    <p>The password for your account has been updated</p>
    <p>If you have received this in error, please e-mail us at ${process.env.ADMIN_EMAIL}</p>

  <footer>
    <p>Best regards,</p>
    <p>AVCDOLOAN Admin Team</p>
  </footer>
  </body>
  </html>
`

class PasswordChangedEmail extends BaseEmail {
  constructor(recipient: string, name: string) {
    const subject: string = "AVCDOLOAN Account password changed";
    const htmlBody = {
			html: ejs.render(html, { name: name }),
			text: 
			`Hello, ${name}
			The password for your account has been updated

			If you have received this in error, please e-mail us at ${process.env.ADMIN_EMAIL}
      Best regards,
      AVOCDOLOAN Admin Team
			`
		};
    super (
      recipient,
      subject,
      htmlBody
    )
  }
}

export default PasswordChangedEmail;
