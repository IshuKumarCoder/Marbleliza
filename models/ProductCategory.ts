import mongoose, { Schema, model, models } from "mongoose";

const ProductCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
  },
  { timestamps: true, collection: 'productcatagory' } // explicitly defining collection name requested by user
);

export const ProductCategory = models.ProductCategory || model("ProductCategory", ProductCategorySchema);
