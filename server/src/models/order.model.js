import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderDetails: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  orderTime: {
    type: Date,
    required: true,
  },
  deliveryTime: {
    type: Date,
    required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  serviceProvider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true,
  }

}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);