import { adminDb } from "@/firebase/firebase.admin";
import { firestore } from "firebase-admin";

export type MailPayload = {
  to: string[];
  from?: string;
  message: {
    subject: string;
    text?: string;
    html?: string;
  };
};

export class MailService {
  private static colRef = adminDb.collection("mail");

  static async sendMail(payload: MailPayload) {
    const EMAIL_FROM = process.env.EMAIL_FROM;
    let emailFrom = "Brandiie";

    if (payload.from) {
      emailFrom = payload.from;
    } else if (EMAIL_FROM) {
      emailFrom = EMAIL_FROM;
    }

    try {
      const docRef = await this.colRef.add({
        ...payload,
        from: emailFrom,
        createdAt: firestore.FieldValue.serverTimestamp()
      });

      return { id: docRef.id };
    } catch (error) {
      console.error("Failed to send mail:", error);
      throw error;
    }
  }

  static createClientUserWelcomeTemplate({
    firstName,
    passwordLink
  }: {
    firstName: string;
    passwordLink: string;
  }) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Welcome Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; margin: 0; padding: 20px; background-color: #f9f9f9;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 900px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">
            <tr>
              <td>
                <p>Hi <strong>${firstName}</strong>,</p>
      
                <p>You’ve been set up on Brandiie! Your personal brand platform that helps you define your voice, build your content system, and use AI in a way that actually sounds like you.</p>

                <p>
                  Your account is ready. Click below to set your password and log in.
                </p>

                <p>
                  👉  <a href="${passwordLink}" style="color: #ffffff; background: #1F3C3C; text-decoration: none; padding: 10px 20px; border-radius: 8px; display: inline-block;">Set Your Password</a>
                </p>

                <p>
                  <strong>Note:</strong> The link expires after one hour. If it’s expired, you’ll be prompted to enter your email and Brandiie will automatically send you a new link.
                </p>
      

                <p><strong>Once you’re in, Brandiie will guide you to:</strong></p>
                <ul>
                  <li>
                    Create your Personal Brand Plan
                  </li>
                  <li>Access your Brand Command (your AI setup)</li>
                  <li>Explore the Resources Hub for short, practical videos</li>
                </ul>

                <p>
                  Welcome aboard — your personal brand just got a whole lot easier.
                </p>
      
                <p>Warmly,</p>
                <p><strong>Jodi</strong><br />Founder of Brandiie</p>
              </td>
            </tr>
          </table>
        </body>
      </html>        
      `;
  }

  static createBrandPlanReadyTemplate({
    firstName,
    ctaLink
  }: {
    firstName: string;
    ctaLink: string;
  }) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Your Personal Brand Plan</title>
      </head>
      <body
        style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; margin: 0; padding: 20px; background-color: #f9f9f9;"
      >
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="max-width: 900px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;"
        >
          <tr>
            <td>
              <p>Hi <strong>${firstName}</strong>,</p>
    
              <p><strong>Your Personal Brand Plan is ready.</strong></p>
    
              <p>
                This is the foundation most people dream of having — a clear,
                tailored blueprint that captures your authority, your content lanes,
                and your tone.
              </p>
    
              <p><strong>Here’s why it matters:</strong></p>
              <ul>
                <li>It gives you clarity on how to position yourself</li>
                <li>It makes showing up online easier and more consistent</li>
                <li>
                  It takes the guesswork out of what to say and how to say it
                </li>
              </ul>
    
              <p>
                👉
                <a
                  href="${ctaLink}"
                  style="color: #ffffff; background: #1F3C3C; text-decoration: none; padding: 10px 20px; border-radius: 8px; display: inline-block;"
                  >View Your Personal Brand Plan</a
                >
              </p>
    
              <p>
                Take a few minutes to read it through. The more it feels like you,
                the easier your content will flow.
              </p>
    
              <p>
                This is step one of building a brand that works as hard as you do.
              </p>
    
              <p>Warm regards,</p>
              <p><strong>Jodi</strong><br />Founder of Brandiie and your content sidekick</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
  }
  static createBrandCommandReadyTemplate({
    firstName,
    ctaLink
  }: {
    firstName: string;
    ctaLink: string;
  }) {
    return `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Your Brand Command</title>
        </head>
        <body
          style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; margin: 0; padding: 20px; background-color: #f9f9f9;"
        >
          <table
            width="100%"
            border="0"
            cellspacing="0"
            cellpadding="0"
            style="max-width: 900px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;"
          >
            <tr>
              <td>
                <p>Hi <strong>${firstName}</strong>,</p>

                <p><strong>Now for the fun part. Your Brand Command is ready.</strong></p>

                <p>
                  If you don’t know what that is, don’t stress — 99.9% of people don’t.
                  Think of it as your AI cheat code. It’s the command that trains AI to
                  sound like you — your voice, your tone, your authority.
                </p>

                <p><strong>With it, you can:</strong></p>
                <ul>
                  <li>Create content smarter and faster</li>
                  <li>Avoid the generic “AI voice” trap</li>
                  <li>Finally have an AI co-pilot that feels like a true extension of you</li>
                </ul>

                <p>
                  👉
                  <a
                    href="${ctaLink}"
                    style="color: #ffffff; background: #1F3C3C; text-decoration: none; padding: 10px 20px; border-radius: 8px; display: inline-block;"
                    >View Your Brand Command</a
                  >
                </p>

                <p>
                  Not sure where to start? You’re not alone. In under 10 minutes,
                  we’ll walk you through everything — from what a Brand Command actually
                  is to setting up your own custom GPT. Then you’ll see just how easy it
                  is to have AI working for you instead of fighting you.
                </p>

                <p>
                  Head to the <strong>Resources</strong> section when you’re ready to dive in.
                </p>

                <p>
                  And here’s the part I love most: this was the moment everything shifted
                  for me. Once I had my Brand Command, creating content finally felt easy,
                  consistent, and actually like me. I’m so excited that you get to
                  experience this too.
                </p>

                <p>Let’s go,</p>
                <p>
                  <strong>Jodi</strong><br />
                  Founder of Brandiie and your content sidekick
                </p>

                <p style="font-size: 12px; color: #666;">
                  P.S. This is where AI stops being overwhelming and starts working for you.
                </p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  }

  static createContactUsTemplate({
    description,
    email,
    firstName,
    lastName,
    subject
  }: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    description: string;
  }) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>New Contact Form Submission from Brandiie</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
          <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px;">
            <tr>
              <td style="padding: 20px; text-align: center; background: #004d40; color: #ffffff; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0;">Contact Form Submission</h2>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; color: #333333;">
                <p>You have received a new message from your website contact form:</p>
                <table width="100%" cellspacing="0" cellpadding="6" style="border-collapse: collapse;">
                  <tr>
                    <td style="font-weight: bold; width: 120px;">Name:</td>
                    <td>${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Email:</td>
                    <td>${email}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Subject:</td>
                    <td>${subject}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; vertical-align: top;">Description:</td>
                    <td>${description}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 15px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #e5e5e5;">
                This email was automatically generated by brandiie contact form.
              </td>
            </tr>
          </table>
        </body>
      </html>    
    `;
  }

  static createContactJodiTemplate({
    company,
    details,
    email,
    employeeSize,
    name
  }: {
    name: string;
    email: string;
    company: string;
    employeeSize: string;
    details: string;
  }) {
    return `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>New Company Plan Subscription Request</h2>
          <p>Hi Team,</p>
          <p>You’ve received a new request for the <strong>Company Plan</strong>. Here are the details:</p>
      
          <table cellpadding="6" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td><strong>Name</strong></td>
              <td>${name}</td>
            </tr>
            <tr>
              <td><strong>Email</strong></td>
              <td>${email}</td>
            </tr>
            <tr>
              <td><strong>Company</strong></td>
              <td>${company}</td>
            </tr>
            <tr>
              <td><strong>Employee Size</strong></td>
              <td>${employeeSize}</td>
            </tr>
            <tr>
              <td><strong>Details / Notes</strong></td>
              <td>${details}</td>
            </tr>
          </table>
      
          <p style="margin-top:20px;">Please reach out to the requester directly to complete the subscription process.</p>
        </body>
      </html>    
    `;
  }
}
