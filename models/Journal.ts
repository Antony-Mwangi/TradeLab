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
  resultR?: number;
  stopLoss?: number;
  takeProfit?: number;
  setup?: string;
  session?: string;
  emotion?: string;
  emotionalIntensity?: number;
  rulesFollowed?: boolean;
  riskRespected?: boolean;
  stopRespected?: boolean;
  planFollowed?: boolean;
  isFomo?: boolean;
  isRevenge?: boolean;
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
    resultR: { type: Number, default: 0 },
    stopLoss: { type: Number },
    takeProfit: { type: Number },
    setup: { type: String, trim: true },
    session: { type: String, trim: true },
    emotion: { type: String, trim: true, default: "Calm" },
    emotionalIntensity: { type: Number, min: 1, max: 5, default: 1 },
    rulesFollowed: { type: Boolean, default: true },
    riskRespected: { type: Boolean, default: true },
    stopRespected: { type: Boolean, default: true },
    planFollowed: { type: Boolean, default: true },
    isFomo: { type: Boolean, default: false },
    isRevenge: { type: Boolean, default: false },
    notes: { type: String, trim: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const JournalModel: Model<IJournal> =
  mongoose.models.Journal || mongoose.model<IJournal>("Journal", JournalSchema);

export default JournalModel;