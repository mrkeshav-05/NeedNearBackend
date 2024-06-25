import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  serviceProvider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true,
  },
  requestDetails: {
    type: String,
    required: true,
  },
  requestStatus: {
    type: String,
    required: true,
  },
  requestTime: {
    type: Date,
    required: true,
  },
  deliveryTime: {
    type: Date,
    required: true,
  },
  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
}, { timestamps: true });

export const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);