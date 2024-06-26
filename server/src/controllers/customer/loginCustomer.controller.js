import { Customer } from "../../models/Customer.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateAccessAndRefreshToken } from "../../utils/generateAccessAndRefreshToken.js";
const loginCustomer = asyncHandler(async (req, res) => {
  // steps to login user
    // 1. retrieve data from user as req.body (request body)
    // 2. username or email 
    // 3. find the user
    // 4. password check
    // 5. generate access and refresh token
    // 6. send cookies
  // 
  try {
    const {email, password} = req.body;
    console.log(email)
    if(!email && !password){
      throw new ApiError(400, "Email and password are required");
    }
    const existingCustomer = await Customer.findOne({email});
    if(!existingCustomer){
      throw new ApiError(404, "User not found");
    }
    const isPasswordValid = await existingCustomer.isPasswordCorrect(password);
    if(!isPasswordValid){
      throw new ApiError(400, "Invalid credentials");
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(existingCustomer._id);

    const loggedInCustomer = await Customer.findOne(existingCustomer._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: true,
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "Customer logged in successfully", loggedInCustomer)
    )

  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export {
  loginCustomer,
}