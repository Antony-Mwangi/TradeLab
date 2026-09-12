// models/Profile.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export type TradingExperience = "beginner" | "intermediate" | "advanced";
export type PrimaryMarket = "forex" | "crypto" | "stocks" | "indices" | "commodities";
export type TradingStyle = "scalping" | "day_trading" | "swing_trading" | "position_trading";
export type TradingSession = "london" | "new_york" | "asian";
export type RiskPreference = "conservative" | "moderate" | "aggressive";
export type BaseCurrency = "USD" | "EUR" | "GBP" | "KES" | "JPY" | "AUD" | "CAD" | "CHF";
export type PsychologyFocus =
  | "discipline" | "fomo" | "revenge_trading" | "overtrading"
  | "patience" | "emotional_control" | "confidence" | "accepting_losses";

export interface IProfile extends Document {
  userId: string;
  fullName?: string;
  bio?: string;
  experience?: TradingExperience;
  primaryMarket?: PrimaryMarket;
  tradingStyle?: TradingStyle;
  tradingSessions?: TradingSession[];
  riskPreference?: RiskPreference;
  baseCurrency?: BaseCurrency;
  timezone?: string;
  accountSize?: number;
  goals?: string;
  psychologyFocus?: PsychologyFocus[];
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema<IProfile> = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, trim: true },
    bio: { type: String, trim: true, maxlength: 500 },
    experience: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    primaryMarket: {
      type: String,
      enum: ["forex", "crypto", "stocks", "indices", "commodities"],
    },
    tradingStyle: {
      type: String,
      enum: ["scalping", "day_trading", "swing_trading", "position_trading"],
    },
    tradingSessions: {
      type: [String],
      enum: ["london", "new_york", "asian"],
      default: [],
    },
    riskPreference: {
      type: String,
      enum: ["conservative", "moderate", "aggressive"],
    },
    baseCurrency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "KES", "JPY", "AUD", "CAD", "CHF"],
      default: "USD",
    },
    timezone: { type: String, default: "UTC" },
    accountSize: { type: Number },
    goals: { type: String, trim: true },
    psychologyFocus: {
      type: [String],
      enum: [
        "discipline", "fomo", "revenge_trading", "overtrading",
        "patience", "emotional_control", "confidence", "accepting_losses",
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);

export default Profile;