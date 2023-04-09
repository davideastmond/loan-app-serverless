type EmailAttributes = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

type EmailHTML = {
  html: string;
  text?: string;
};

export abstract class BaseEmail {
  private recipient: string;
  private subject: string;
  private html: EmailHTML;

  constructor(recipient: string, subject: string, html: EmailHTML) {
    this.recipient = recipient;
    this.subject = subject;
    this.html = html;
  }

  public getEmail(): EmailAttributes {
    return {
      to: this.recipient,
      subject: this.subject,
      html: this.html.html,
      text: this.html.text,
    };
  }
}
