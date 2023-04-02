import ejs from 'ejs';
import { BaseEmail } from '../base-email';
const html = `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Recovery E-mail</title>
  </head>
  <body>
		<p>Hello, <%= name %></p>
		<p>Thank you for registering for an AVCDOLOAN </p>
		<p>We have received your application</p>
		<p>Your application identification number is <%= applicationId %></p>
		<p> Expect a response between 24-72 business hours.</p>

    <p>If you have received this in error, please e-mail us at <$= adminEmail %><p>
  <footer>
    <p>Best regards,</p>
    <p>AVCDOLOAN Admin Team</p>
  </footer>
  </body>
  </html>
`

class WelcomeEmail extends BaseEmail {
  constructor(recipient: string, name: string, applicationId: string, adminEmail: string) {
    const subject: string = "AVCDOLOAN Sign Up";
    const htmlBody = {
			html: ejs.render(html, { name: name, applicationId: applicationId, adminEmail: adminEmail }),
			text: 
			`Hello${name}
			Thank you for registering for an AVCDOLOAN 
			We have received your application.
			Your application identification number is ${applicationId}
			Expect a response between 24-72 business hours.

			If you have received this in error, please e-mail us at ${adminEmail}
      Best regards,
      AVCDOLOAN Admin Team
			`
		};
		super(
			recipient,
			subject,
			htmlBody
		)
  }
}

export default WelcomeEmail;
