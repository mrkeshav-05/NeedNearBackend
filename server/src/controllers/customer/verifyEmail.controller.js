import { Customer } from "../../models/Customer.model.js";
import { ApiError } from "../../utils/error/ApiError.js";
import { asyncHandler } from "../../utils/error/asyncHandler.js";
import { ApiResponse } from "../../utils/response/ApiResponse.js";
import jwt from 'jsonwebtoken';
const verifyEmail = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.params;
    if(!token){
      throw new ApiError(400, "Token not found");
    }
    const decodedToken = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
    if(!decodedToken){
      throw new ApiError(400, "decoded token not found");
    }
    // find the customer with the decoded token id
    // const customerWithDecodedTokenId = await Customer.findOneAndUpdate(
    //   {email: decodedToken.email}, //used to find.
    //   {$set: emailVerified}, //used to what value to update
    //   { new: true }, // used to set new value
    // );
    const customerWithDecodedTokenId = await Customer.findOne({email: decodedToken.email});
    if(!customerWithDecodedTokenId){
      throw new ApiError(404, "Invalid token or user not found");
    }

    customerWithDecodedTokenId.emailVerified = true;

    await customerWithDecodedTokenId.save({validateBeforeSave: false});
    res
    .status(200)
    .json(
      new ApiResponse(200, "Email verified successfully")
    )
  } catch (error) {
    res
    .status(400)
    .json(
      new ApiResponse(400, "Invalid or expired token")
    )
  }
})


export {
  verifyEmail,
}