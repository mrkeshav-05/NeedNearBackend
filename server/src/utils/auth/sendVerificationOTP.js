import { ApiError } from "../error/ApiError.js";
import { asyncHandler } from "../error/asyncHandler.js";
import twilio from 'twilio';
import { ApiResponse } from "../response/ApiResponse.js";
const sendVerificationOTP = asyncHandler(async(req, res, next) => {
  console.log("hi")
  try {
    const { phoneNumber } = req.body;
    if(!phoneNumber){
      throw new ApiError(400, "Phone number is required");
    }
    const formattedPhoneNumber = '+91' + phoneNumber;
    const accountSID = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const serviceSID = process.env.TWILIO_SERVICE_SID;
    const client = twilio(accountSID, authToken);
    const verification = await client.verify.v2.services(serviceSID)
      .verifications
      .create({ to: formattedPhoneNumber, channel: 'sms' });

    return res
    .status(200)
    .json(
      new ApiResponse(200, "OTP sent successfully", verification)
    )
  } catch (error) {
    throw new ApiError(500, error.message);
  }
})

export {
  sendVerificationOTP,
}