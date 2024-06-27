import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../utils/tokens/generateAccessToken.js';
import { generateRefreshToken } from '../utils/tokens/generateRefreshToke.js';
import { generateEmailVerificationToken } from '../utils/tokens/generateEmailVerificationToken.js';

const customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNumberVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  },
  refreshToken: {
    type: String,
  }
}, { timestamps: true });


customerSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

customerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
  // password is the password entered by the user
  // this.password is the hashed password in the database
}

customerSchema.methods.generateAccessToken = async function () {
  return generateAccessToken(this);
}

customerSchema.methods.generateRefreshToken = async function () {
  return generateRefreshToken(this);
}

customerSchema.methods.generateEmailVarificationToken = async function () {
  return generateEmailVerificationToken(this);
}


export const Customer = mongoose.model('Customer', customerSchema);