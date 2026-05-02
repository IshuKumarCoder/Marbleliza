import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: 'ProductCategory', required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true }, // Hero image
    galleryImage1: { type: String },
    galleryImage2: { type: String },
    galleryImage3: { type: String },
    feature1: { type: String },
    feature2: { type: String },
    feature3: { type: String },
    feature4: { type: String },
    thickness: { type: String },
    quality: { type: String },
    color: { type: String },
    usesArea: { type: String },
    details: { type: String }, // General description
    status: { type: String, default: 'In Stock' }
  },
  { timestamps: true, collection: 'products' }
);

export const Product = models.Product || model("Product", ProductSchema);
