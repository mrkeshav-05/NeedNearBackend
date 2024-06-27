import { Customer } from "../../models/Customer.model.js";
import { ApiError } from "../../utils/error/ApiError.js";
import { ApiResponse } from "../../utils/response/ApiResponse.js";
import { asyncHandler } from "../../utils/error/asyncHandler.js";

const logoutCustomer = asyncHandler(async (req, res) => {
  // steps to logout user
    // 1. clear the cookies
    // 2. send response
  // 
  try {
    await Customer.findByIdAndUpdate(req.customer._id, 
      {
        $set: {
          refreshToken: "",
        }
      },
      {
        new: true,
      }
    )
    const options = {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    }
    return res
    .status(200)
    .cookie("accessToken", "", options)
    .cookie("refreshToken", "", options)
    .json(
      new ApiResponse(200, "Customer logged out successfully")
    )
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});


export {
  logoutCustomer,
}