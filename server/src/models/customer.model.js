import mongoose from 'mongoose';

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
}, { timestamps: true });

export const Customer = mongoose.model('Customer', customerSchema);