import mongoose from 'mongoose';

const serviceProviderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  rating: {
    type: Number,
    default: 0,
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  },
  refreshToken: {
    type: String,
  },
}, { timestamps: true });

export const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);