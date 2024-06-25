import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  categoryName: {
    typeof: String,
    required: true,
  }
}, { timestamps: true });

export const Category = mongoose.model('Category', categorySchema);