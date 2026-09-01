// src/models/TradingPlan.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStrategy {
  name: string;
  marketCondition: string[];
  entryConditions: string[];
  confirmation: string[];
  status: "Active" | "Archived";
}

export interface ITradingPlan extends Document {
  userId: string;
  planName: string;
  version: string;
  markets: string[];
  instruments: string[];
  preferredSessions: string[];
  tradingHours: { start: string; end: string };
  strategies: IStrategy[];
  riskManagement: {
    maxRiskPerTrade: number;
    maxDailyLoss: number;
    maxWeeklyLoss: number;
    maxTradesPerDay: number;
    minRiskReward: string;
    maxOpenPositions: number;
  };
  entryRules: string[];
  exitRules: {
    takeProfit: string[];
    stopLoss: string[];
    earlyExitRules: string[];
  };
  psychologyRules: {
    beforeTrading: string[];
    afterLoss: string[];
  };
  noTradeConditions: string[];
  dailyRoutine: {
    beforeMarket: string[];
    duringMarket: string[];
    afterMarket: string[];
  };
  lastReviewed: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StrategySchema = new Schema({
  name: { type: String, required: true, trim: true },
  marketCondition: [{ type: String }],
  entryConditions: [{ type: String }],
  confirmation: [{ type: String }],
  status: { type: String, enum: ["Active", "Archived"], default: "Active" },
});

const TradingPlanSchema: Schema<ITradingPlan> = new Schema(
  {
    userId: { type: String, required: true, index: true },
    planName: { type: String, required: true, trim: true, default: "My Trading Plan" },
    version: { type: String, default: "1.0" },
    markets: [{ type: String }],
    instruments: [{ type: String }],
    preferredSessions: [{ type: String }],
    tradingHours: {
      start: { type: String, default: "08:00" },
      end: { type: String, default: "16:00" },
    },
    strategies: [StrategySchema],
    riskManagement: {
      maxRiskPerTrade: { type: Number, default: 1.0 },
      maxDailyLoss: { type: Number, default: 3.0 },
      maxWeeklyLoss: { type: Number, default: 6.0 },
      maxTradesPerDay: { type: Number, default: 3 },
      minRiskReward: { type: String, default: "1:2" },
      maxOpenPositions: { type: Number, default: 2 },
    },
    entryRules: [{ type: String }],
    exitRules: {
      takeProfit: [{ type: String }],
      stopLoss: [{ type: String }],
      earlyExitRules: [{ type: String }],
    },
    psychologyRules: {
      beforeTrading: [{ type: String }],
      afterLoss: [{ type: String }],
    },
    noTradeConditions: [{ type: String }],
    dailyRoutine: {
      beforeMarket: [{ type: String }],
      duringMarket: [{ type: String }],
      afterMarket: [{ type: String }],
    },
    lastReviewed: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const TradingPlanModel: Model<ITradingPlan> =
  mongoose.models.TradingPlan || mongoose.model<ITradingPlan>("TradingPlan", TradingPlanSchema);

export default TradingPlanModel;