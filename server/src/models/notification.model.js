import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  notificationType: {
    type: String,
    required: true,
  },
  entity_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'entityModel',
    required: true,
  },
  entityModel: {
    type: String,
    required: true,
    enum: ['Order', 'ServiceRequest', 'Review'],
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  serviceProvider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
  },
}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);