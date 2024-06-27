import { Customer } from "../../models/Customer.model.js";
import { ApiError } from "../../utils/error/ApiError.js";
import { asyncHandler } from "../../utils/error/asyncHandler.js";
import { ApiResponse } from "../../utils/response/ApiResponse.js";
import twilio from 'twilio';
const verifyPhoneNumberOTP = asyncHandler(async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;
    console.log(phoneNumber, code);
    if (!phoneNumber || !code) {
      throw new ApiError(400, "Phone number and code are required");
    }
    const formattedPhoneNumber = '+91' + phoneNumber;
  
    const accountSID = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const serviceSID = process.env.TWILIO_SERVICE_SID;
    const client = twilio(accountSID, authToken);
  
    const verificationCheck = await client.verify.v2.services(serviceSID)
      .verificationChecks
      .create({ to: formattedPhoneNumber, code: code });
  
    if(verificationCheck.status === "approved"){
      const customerWithThisPhoneNumber = await Customer.findOne({phoneNumber: phoneNumber})
      if (!customerWithThisPhoneNumber){
        throw new ApiError(404, "Customer not found with this phoneNumber");
      }
      customerWithThisPhoneNumber.phoneNumberVerified = true;
      await customerWithThisPhoneNumber.save({validateBeforeSave: false});
      return res
      .status(200)
      .json(
        new ApiResponse(200, "Phone number verified successfully")
      )
    }else{
      throw new ApiError(400, "Invalid code")
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
})

export {
  verifyPhoneNumberOTP,
}