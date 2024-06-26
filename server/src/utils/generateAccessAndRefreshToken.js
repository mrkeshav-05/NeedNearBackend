import { Customer } from "../models/Customer.model.js";

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


export {
  generateAccessAndRefreshToken,
}