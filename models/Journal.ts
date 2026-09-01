// src/models/Journal.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJournal extends Document {
  userId: string;
  asset: string;
  assetType: "forex" | "crypto" | "stocks";
  tradeType: "BUY" | "SELL";
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  setup?: string;
  session?: string;
  emotion?: string;
  notes?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JournalSchema: Schema<IJournal> = new Schema(
  {
    userId: { type: String, required: true, index: true },
    asset: { type: String, required: true, trim: true },
    assetType: { type: String, enum: ["forex", "crypto", "stocks"], required: true },
    tradeType: { type: String, enum: ["BUY", "SELL"], required: true },
    entryPrice: { type: Number, required: true },
    exitPrice: { type: Number, required: true },
    pnl: { type: Number, required: true },
    setup: { type: String, trim: true },
    session: { type: String, trim: true },
    emotion: { type: String, trim: true },
    notes: { type: String, trim: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const JournalModel: Model<IJournal> =
  mongoose.models.Journal || mongoose.model<IJournal>("Journal", JournalSchema);

export default JournalModel;