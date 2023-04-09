import { Request, Response, Router } from "express";
import { PasswordRecoveryEmail, PasswordChangedEmail, WelcomeEmail, VerificationCodeEmail } from "../../data/emails";
import { emailer } from "../../utils/emailer/emailer";

import { passwordChangedEmailValidator, recoveryEmailValidator, welcomeEmailValidator, verificationCodeEmailValidator } from "./validators/emailer-validators";

async function postSendPasswordRecoveryEmail (req: Request, res: Response) {
  // Send a password recovery e-mail
  const { recipient, name, recoveryURL, adminEmail } = req.body;
  try {
    await emailer.sendEmail(new PasswordRecoveryEmail(recipient, adminEmail, name, recoveryURL));
    return res.status(200).send({ msg: 'OK'})
  } catch (err: any) {
    res.status(500).send({
      err: err
    })
  }
}

async function postSendPasswordChangedEmail(req: Request, res: Response) {
  // Send notification e-mail that password changed
  const { recipient, name } = req.body;
  try {
    await emailer.sendEmail(new PasswordChangedEmail(recipient, name));
    return res.status(200).send({ msg: 'OK'});
  } catch (err: any) {
    return res.status(500).send({
      err: 'Failed to send password changed e-mail request'
    })
  }
}

async function postSendWelcomeEmail(req: Request, res: Response) {
  const { applicationId, recipient, name, adminEmail } = req.body;
  try {
    await emailer.sendEmail(new WelcomeEmail(recipient, name, applicationId, adminEmail));
    return res.status(200).send({ msg: 'OK'})
  } catch (err: any) {
    return res.status(500).send({
      err: 'Failed to send welcome e-mail request'
    })
  }
}

async function postSendVerificationCodeEmail(req: Request, res: Response) {
  const { code, recipient } = req.body;
  try {
    console.info(48, code, recipient);
    await emailer.sendEmail(new VerificationCodeEmail(recipient, code));
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      err: 'Failed to send verification code e-mail request'
    })
  }
}

export default function(app: Router ) {
  app.post("/email/recovery-email", recoveryEmailValidator, postSendPasswordRecoveryEmail);
  app.post("/email/password-changed-notification", passwordChangedEmailValidator, postSendPasswordChangedEmail);
  app.post("/email/welcome-email", welcomeEmailValidator, postSendWelcomeEmail);
  app.post("/email/verification-code", verificationCodeEmailValidator, postSendVerificationCodeEmail)
}

console.info("Emailer component registered.");
