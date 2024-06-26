import { Customer } from "../../models/Customer.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ServiceProvider } from "../../models/serviceProvider.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
const registerServiceProvider = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, address } = req.body;
    if (
      [fullName, email, phoneNumber, password, address].some((field) => {
        field?.trim() === "";
      })
    ) {
      throw new ApiError(400, "All fields are required");
    }
    // check if the user is already registered
    const existingServiceProvider = await ServiceProvider.findOne({
      $or: [
        { email: email },
        { phoneNumber: phoneNumber },
      ],
    }).then((serviceProvider) => {
      if (serviceProvider) {
        throw new ApiError(
          409,
          "User already exists with this email or phone number"
        );
      }
    }).catch((error) => {
      throw new ApiError(500, error.message);
    });

    if (existingServiceProvider) {
      throw new ApiError(409, "User already exists !!!");
    }

    const profilePictureLocalPath = req.files?.profilePicture[0].path;

    if (!profilePictureLocalPath) {
      throw new ApiError(400, "Profile picture is required");
    }
    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);

    if (!profilePicture) {
      return new ApiError(400, "Avatar upload failed");
    }
    const customer = await Customer.create({
      fullName,
      email: email.toLowerCase(),
      phoneNumber,
      password,
      profilePicture: profilePicture?.url || "",
      address,
    });
    const createdCustomer = await Customer.findById(customer._id).select(
      "-password -refreshToken"
    );

    const serviceProvider = await ServiceProvider.create({
      customer_id: createdCustomer._id,
      // service_id
    })
    console.log(serviceProvider);

    return res
      .status(201)
      .json(
        new ApiResponse(201, "ServiceProvider registered successfully", { customer: createdCustomer, serviceProvider: serviceProvider })
      )
  } catch (error) {
    throw new ApiError(500, error.message);
  }
})

export {
  registerServiceProvider,
}