import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  notificationType: {
    type: String,
    required: true,
  },
  entity_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);