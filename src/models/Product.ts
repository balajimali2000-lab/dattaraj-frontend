import mongoose, { Schema, model, models } from 'mongoose';

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  image: {
    thumbnail: string;
    low: string;
    mid: string;
    high: string;
    veryHigh: string;
  };
  description: string;
  price: number;
  serialNumber: string;
  type: string;
  stock?: number;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: {
      thumbnail: { type: String, default: "" },
      low: { type: String, default: "" },
      mid: { type: String, default: "" },
      high: { type: String, default: "" },
      veryHigh: { type: String, default: "" },
    },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    serialNumber: { type: String, required: true },
    type: { type: String, default: "gold" },
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;
