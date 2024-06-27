import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { ApiError } from '../error/ApiError.js';


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if(!localFilePath){
      return {error: "File path is missing"};
    }
    if(!fs.existsSync(localFilePath)){
      return {error: "File not found"};
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    throw new ApiError(409, error.message);
  }
}

export { uploadOnCloudinary };