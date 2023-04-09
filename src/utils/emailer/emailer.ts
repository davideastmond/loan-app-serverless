import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
import { BaseEmail } from "../../data/emails/base-email";

class Emailer {
  private sender: string;
  private transporter: any;
  constructor() {
    this.sender = process.env.ADMIN_EMAIL!;
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });
  }

  // Send an e-mail
  async sendEmail(email: BaseEmail) {
    const emailObject = {
      from: this.sender,
      ...email.getEmail(),
    };
    try {
      console.info("Timestamp: ", new Date().toISOString());
      const res = await this.transporter.sendMail(emailObject);
      console.info(res);
    } catch (err: any) {
      console.log(err);
    }
  }
}

const emailer = new Emailer();
export { emailer };
