// src/models/Backtest.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBacktestTrade {
  tradeNumber: number;
  symbol: string;
  direction: "BUY" | "SELL";
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  resultR: number;
  setup: string;
  emotion: string;
  rulesFollowed: boolean;
  notes?: string;
  createdAt: Date;
}

export interface IBacktest extends Document {
  userId: string;
  strategyName: string;
  description?: string;
  market: string;
  symbol: string;
  timeframe: string;
  startDate: string;
  endDate: string;
  stopLossPips: number;
  takeProfitPips: number;
  riskPerTrade: number;
  maxTradesPerDay: number;
  trades: IBacktestTrade[];
  createdAt: Date;
  updatedAt: Date;
}

const BacktestTradeSchema = new Schema<IBacktestTrade>({
  tradeNumber: { type: Number, required: true },
  symbol: { type: String, required: true },
  direction: { type: String, enum: ["BUY", "SELL"], required: true },
  entryPrice: { type: Number, required: true },
  stopLoss: { type: Number, required: true },
  takeProfit: { type: Number, required: true },
  resultR: { type: Number, required: true },
  setup: { type: String, required: true },
  emotion: { type: String, default: "Calm" },
  rulesFollowed: { type: Boolean, default: true },
  notes: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const BacktestSchema: Schema<IBacktest> = new Schema(
  {
    userId: { type: String, required: true, index: true },
    strategyName: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    market: { type: String, required: true },
    symbol: { type: String, required: true },
    timeframe: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    stopLossPips: { type: Number, default: 20 },
    takeProfitPips: { type: Number, default: 40 },
    riskPerTrade: { type: Number, default: 1.0 },
    maxTradesPerDay: { type: Number, default: 2 },
    trades: [BacktestTradeSchema],
  },
  { timestamps: true }
);

const BacktestModel: Model<IBacktest> =
  mongoose.models.Backtest || mongoose.model<IBacktest>("Backtest", BacktestSchema);

export default BacktestModel;