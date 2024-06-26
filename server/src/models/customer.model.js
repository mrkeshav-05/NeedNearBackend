import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m'
    }
  )
}

customerSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d'
    }
  )
}


export const Customer = mongoose.model('Customer', customerSchema);