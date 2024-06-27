import { ApiError } from "../error/ApiError.js";
import { transporter } from "./nodemailer.js";

const sendVerificationEmail = async (customer, token) => {
  try {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: 'Email Verification',
      html: 
      `
        <h1>Email Verification</h1>
        <p>
          Click 
          <a href="${verificationUrl}">
            here
          </a>
          to verify your email.
        </p>
      `
    }
  
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error in sendVerificationEmail")
    throw new ApiError(401, error.message);
  }
}

export {
  sendVerificationEmail,
}