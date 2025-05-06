import transporter from "nodemailer";

/**
 * Send an email using Nodemailer transporter
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email plain text content
 * @param {string} [html] - Optional HTML content for richer emails
 */
export const sendEmail = async (to, subject, text, html = null) => {
  const mailOptions = {
    from: `"Hostel Management" <${process.env.PASS_MAIL}>`,
    to,
    subject,
    text,
  };

  // If HTML is provided, add it
  if (html) {
    mailOptions.html = html;
  }

  return await transporter.sendMail(mailOptions);
};
