// src/models/CustomTradingNews.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICustomTradingNews extends Document {
  userId: string;
  title: string;
  currency: string;
  impact: "Low" | "Medium" | "High";
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  forecast: string;
  previous: string;
  actual?: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomTradingNewsSchema: Schema<ICustomTradingNews> = new Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    currency: { type: String, required: true },
    impact: { type: String, enum: ["Low", "Medium", "High"], required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    forecast: { type: String, default: "" },
    previous: { type: String, default: "" },
    actual: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

const CustomTradingNewsModel: Model<ICustomTradingNews> =
  mongoose.models.CustomTradingNews ||
  mongoose.model<ICustomTradingNews>("CustomTradingNews", CustomTradingNewsSchema);

export default CustomTradingNewsModel;