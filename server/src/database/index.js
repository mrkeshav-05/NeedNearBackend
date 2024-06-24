import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';


const connectDB = async (req, res) => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    // console.log(connectionInstance)
    console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MOngoDB Connection Failed", error);
    process.exit(1);
  }
}

export default connectDB;