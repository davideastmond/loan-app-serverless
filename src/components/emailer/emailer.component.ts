import { Request, Response, Router } from "express";
import { PasswordRecoveryEmail } from "../../data/emails/password-recovery-email/password-recovery-email";
import { Emailer } from "../../utils/emailer/emailer";
import { recoveryEmailValidator } from "./validators/emailer-validators";

async function postSendPasswordRecoveryEmail (req: Request, res: Response) {
  // Send a password recovery e-mail
  const { recipient, name, recoveryURL } = req.body;
  try {
    const emailer = new Emailer();
    await emailer.sendEmail(new PasswordRecoveryEmail(recipient, name, recoveryURL));
    return res.status(200).send({ msg: 'OK'})
  } catch (err: any) {
    res.status(500).send({
      err: err
    })
  }
}

export default function(app: Router ) {
  app.post("/email/recovery-email", recoveryEmailValidator, postSendPasswordRecoveryEmail);
}

console.info("Emailer component registered.");
