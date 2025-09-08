import { parseTemplate } from "./templateParser";
import nodemailer, { SentMessageInfo } from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  placeholders: Record<string, any>
): Promise<SentMessageInfo | undefined> => {
  try {
    const htmlContent = parseTemplate(templateName, placeholders);

    // Create a transporter with improved timeout and debugging
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL,
        pass: process.env.NEXT_PUBLIC_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info?.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", {
      error: error,
    });
    return undefined;
  }
};
