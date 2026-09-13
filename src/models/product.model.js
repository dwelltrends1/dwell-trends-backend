import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  colourName: { type: String, required: true },
  colourHex: { type: String, required: true },
  stock: { type: Number, required: true, min: 0, default: 0 },
  sku: { type: String },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, default: "Dwell Trends" },
    category: { type: String, required: true, index: true },
    description: { type: String, required: true },
    
    price: { type: Number, required: true, min: 0 },
    mrp: { type: Number, required: true, min: 0 },
    mainCategory: { 
      type: String, 
      enum: ["Men", "Women", "Kids", "Beauty", "Home"], 
      required: true 
    },
    subCategory: { type: String, required: true },

    // Per-product custom delivery charge & rewards allocation
    deliveryCharge: {
      type: Number,
      default: 0,
      min: 0,
    },
    tokensOffered: {
      type: Number,
      default: 0,
      min: 0,
    },
    
    // Deal Engine Fields
    dealType: {
      type: String,
      enum: ["None", "Hot", "Wow"],
      default: "None",
    },
    dealPrice: {
      type: Number,
      default: null,
    },
    
    // Size/color variant tracking
    variants: [variantSchema],
    
    // Cloudinary media setup
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      }
    ],
    
    fabric: { type: String },
    work: { type: String },
    details: [{ type: String }],
    
    isNewItem: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);