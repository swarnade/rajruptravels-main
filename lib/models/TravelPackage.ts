import { Schema, model, models } from "mongoose";

const ItinerarySchema = new Schema(
  {
    day: { type: Number, required: true, min: 1 },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const TravelPackageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ["domestic", "international"],
      default: "domestic",
    },
    state: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    coverImage: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    durationDays: { type: Number, required: true, min: 1 },
    rating: { type: Number, default: 4.8, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false },
    description: { type: String, required: true, trim: true },
    highlights: { type: [String], default: [] },
    gallery: { type: [String], default: [] },
    itinerary: { type: [ItinerarySchema], default: [] },
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
  },
  { timestamps: true }
);

export type TravelPackageType = {
  _id: string;
  name: string;
  slug: string;
  category: "domestic" | "international";
  state: string;
  destination: string;
  coverImage: string;
  price: number;
  durationDays: number;
  rating: number;
  reviews: number;
  featured: boolean;
  description: string;
  highlights: string[];
  gallery: string[];
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  createdAt?: string;
  updatedAt?: string;
};

export const TravelPackage = models.TravelPackage || model("TravelPackage", TravelPackageSchema);
