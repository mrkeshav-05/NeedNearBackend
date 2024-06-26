import { Customer } from "../models/Customer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (customer_id) => {
  try {
    // find customer by it's _id
    const customer = await Customer.findById(customer_id);
    console.log(customer)
    // geneating access token
    const accessToken = await customer.generateAccessToken();
    // generating refresh token
    const refreshToken = await customer.generateRefreshToken();
    // set the refresh token
    customer.refreshToken = refreshToken;
    console.log(customer.refreshToken)
    // it will shcow error while saving bcz wee are not providing other information
    await customer.save({validateBeforeSave: false});

    return {accessToken, refreshToken}
  } catch (error) {
    throw new ApiError(500, "Somthing went wrong while generating access and refresh token");
  }
}

const registerCustomer = asyncHandler(async (req, res) => {
  // steps to register a user ---
    // 1. get the user details from frontend(client)
    // 2. validation - not empty string
    // 3. check if the user is already registered: email, username
    // 4. check for avatar, check for images
    // 5. upload them on cludinary, avatar
    // 6. create a object of user -  create entry in the database
    //   (as respoonse from the database it give as it is do we have to hide the password and other details)
    // 7. remove password and refreshToken from the response
    // 8. check the user creation 
    // 9. send the response back to the client
  
  try {
    const { fullName, email, phoneNumber, password, address} = req.body;
    console.log(email);
    if(
      [fullName, email, phoneNumber, password, address].some((field)=>{
        field?.trim() === ""
      })
    ){
      throw new ApiError(400, "All fields are required");
    }
    // check if the user is already registered
    const existingCustomer = await Customer.findOne({
      $or: [
        {email: email},
        {phoneNumber: phoneNumber}
      ]
    }).then((customer)=>{
      if(customer){
        throw new ApiError(409, "User already exists with this email or phone number");
      }
    }).catch((error)=>{
      throw new ApiError(500, error.message);
    });
  
    if(existingCustomer){
      throw new ApiError(409, "User already exists !!!");
    }
  
    const profilePictureLocalPath = req.files?.profilePicture[0].path;
    if(!profilePictureLocalPath){
      throw new ApiError(400, "Profile picture is required");
    }
    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);
  
    if(!profilePicture){
      return new ApiError(400, "Avatar upload failed");
    }
  
    const newCustomer = await Customer.create({
      fullName,
      email: email.toLowerCase(),
      phoneNumber,
      password,
      profilePicture: profilePicture?.url || "",
      address,
    })
    console.log(newCustomer);
    
    const createdCustomer = await Customer.findById(newCustomer._id).select(
      "-password -refreshToken",
    );
  
    if(!createdCustomer){
      throw new ApiError(500, "Somthing went wrong while entering the customer in the database");
    }
  
    return res
    .status(201)
    .json(
      new ApiResponse(201, "Customer created successfully", createdCustomer)
    )
  } catch (error) {
    throw new ApiError(500, error.message);
  }

})

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

export{
  registerCustomer,
  loginCustomer,
}