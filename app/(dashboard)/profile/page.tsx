// app/(dashboard)/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Mail,
  Briefcase,
  TrendingUp,
  Target,
  Brain,
  Shield,
  Clock,
  DollarSign,
  Globe,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Award,
  Zap,
  Activity,
  BookOpen,
  Heart,
  Flame,
  Edit3,
  X,
  FileText,
  Ban,
} from "lucide-react";

// ===== Section wrapper =====
function Section({
  title,
  description,
  icon: Icon,
  color,
  children,
}: {
  title: string;
  description?: string;
  icon: any;
  color: "emerald" | "blue" | "amber" | "purple" | "rose";
  children: React.ReactNode;
}) {
  const colorMap = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-slate-700">
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${colorMap[color]}`}
        >
          <Icon size={18} />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">{title}</h2>
          {description && (
            <p className="text-xs text-slate-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

// ===== Option Pill (single select) =====
function OptionPill({
  options,
  value,
  onChange,
  color,
}: {
  options: { value: string; label: string; icon?: any }[];
  value: string | undefined;
  onChange: (v: string) => void;
  color: "emerald" | "blue" | "amber" | "purple" | "rose";
}) {
  const colorMap = {
    emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    blue: "border-blue-500/40 bg-blue-500/10 text-blue-400",
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    purple: "border-purple-500/40 bg-purple-500/10 text-purple-400",
    rose: "border-rose-500/40 bg-rose-500/10 text-rose-400",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
              active
                ? colorMap[color]
                : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white"
            }`}
          >
            {Icon && <Icon size={13} />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ===== Multi-Select Chips =====
function MultiSelectChips({
  options,
  selected,
  onToggle,
  color,
}: {
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (v: string) => void;
  color: "emerald" | "blue" | "amber" | "purple" | "rose";
}) {
  const colorMap = {
    emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    blue: "border-blue-500/40 bg-blue-500/10 text-blue-400",
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    purple: "border-purple-500/40 bg-purple-500/10 text-purple-400",
    rose: "border-rose-500/40 bg-rose-500/10 text-rose-400",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onToggle(opt.value)}
            className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
              active
                ? colorMap[color]
                : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white"
            }`}
          >
            {active && "✓ "}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ===== View Mode Row =====
function ViewRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2.5 border-b border-slate-800/60 last:border-0">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <div className="sm:col-span-2 text-sm text-slate-200">
        {value || <span className="text-slate-600 italic">Not set</span>}
      </div>
    </div>
  );
}

// ===== Preview Card Wrapper =====
function ViewSection({
  title,
  icon: Icon,
  color,
  children,
}: {
  title: string;
  icon: any;
  color: "emerald" | "blue" | "amber" | "purple" | "rose";
  children: React.ReactNode;
}) {
  const colorMap = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
      <div className="border-b border-slate-800 bg-slate-950/50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg border ${colorMap[color]}`}
          >
            <Icon size={16} />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {title}
          </h3>
        </div>
      </div>
      <div className="px-6 py-2">{children}</div>
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedIndicator, setSavedIndicator] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    experience: "",
    primaryMarket: "",
    tradingStyle: "",
    tradingSessions: [] as string[],
    riskPreference: "",
    baseCurrency: "USD",
    timezone: "UTC",
    accountSize: "",
    goals: "",
    psychologyFocus: [] as string[],
  });

  // Snapshot of profile from server for cancel support
  const [originalData, setOriginalData] = useState(formData);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.profile) {
        const loaded = {
          fullName: data.profile.fullName || data.user?.name || "",
          bio: data.profile.bio || "",
          experience: data.profile.experience || "",
          primaryMarket: data.profile.primaryMarket || "",
          tradingStyle: data.profile.tradingStyle || "",
          tradingSessions: data.profile.tradingSessions || [],
          riskPreference: data.profile.riskPreference || "",
          baseCurrency: data.profile.baseCurrency || "USD",
          timezone: data.profile.timezone || "UTC",
          accountSize: data.profile.accountSize?.toString() || "",
          goals: data.profile.goals || "",
          psychologyFocus: data.profile.psychologyFocus || [],
        };
        setFormData(loaded);
        setOriginalData(loaded);

        // Auto-enter edit mode if profile is basically empty
        const isEmpty =
          !loaded.experience &&
          !loaded.primaryMarket &&
          !loaded.tradingStyle;
        if (isEmpty) setIsEditing(true);
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...formData,
        accountSize: formData.accountSize
          ? Number(formData.accountSize)
          : undefined,
      };

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSavedIndicator(true);
        setOriginalData(formData);
        setIsEditing(false); // ← Switch back to view mode
        setTimeout(() => setSavedIndicator(false), 2500);
      } else {
        setError(data.error || "Failed to save profile");
      }
    } catch (err) {
      console.error("Error saving profile", err);
      setError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData); // Roll back changes
    setIsEditing(false);
    setError("");
  };

  const toggleSession = (session: string) => {
    setFormData((prev) => ({
      ...prev,
      tradingSessions: prev.tradingSessions.includes(session)
        ? prev.tradingSessions.filter((s) => s !== session)
        : [...prev.tradingSessions, session],
    }));
  };

  const togglePsychology = (focus: string) => {
    setFormData((prev) => ({
      ...prev,
      psychologyFocus: prev.psychologyFocus.includes(focus)
        ? prev.psychologyFocus.filter((f) => f !== focus)
        : [...prev.psychologyFocus, focus],
    }));
  };

  // Progress calculation
  const filledFields = [
    formData.fullName,
    formData.bio,
    formData.experience,
    formData.primaryMarket,
    formData.tradingStyle,
    formData.tradingSessions.length > 0,
    formData.riskPreference,
    formData.baseCurrency,
    formData.timezone,
    formData.accountSize,
    formData.goals,
    formData.psychologyFocus.length > 0,
  ].filter(Boolean).length;
  const completionPercent = Math.round((filledFields / 12) * 100);

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-400" />
        <p className="text-slate-400 text-sm">Loading your profile...</p>
      </div>
    );
  }

  const userName = formData.fullName || session?.user?.name || "Trader";
  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Format helpers for view mode
  const formatLabel = (val: string) => {
    if (!val) return null;
    return val
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const formatSessions = (sessions: string[]) => {
    const map: Record<string, string> = {
      london: "London",
      new_york: "New York",
      asian: "Asian",
    };
    return sessions.map((s) => map[s] || s);
  };

  const formatPsychology = (focus: string[]) => {
    const map: Record<string, string> = {
      discipline: "Discipline",
      fomo: "FOMO",
      revenge_trading: "Revenge Trading",
      overtrading: "Overtrading",
      patience: "Patience",
      emotional_control: "Emotional Control",
      confidence: "Confidence",
      accepting_losses: "Accepting Losses",
    };
    return focus.map((f) => map[f] || f);
  };

  return (
    <>
      {/* ============ PAGE HEADER ============ */}
      <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <User className="h-4 w-4 text-emerald-400" />
            <p className="text-sm font-medium text-emerald-400">
              Your Trading Identity
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {isEditing ? "Edit Profile" : "My Profile"}
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            {isEditing
              ? "Update your trading identity and preferences. Changes save to your account."
              : "Your trading profile at a glance. Click edit to make changes."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              <Edit3 size={16} />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-900 hover:border-slate-700 transition"
              >
                <X size={16} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg shadow-emerald-500/20"
              >
                {savedIndicator ? (
                  <>
                    <CheckCircle2 size={16} />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    {saving ? "Saving..." : "Save Changes"}
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </section>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3">
          <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* ============ PROFILE HEADER CARD (always visible) ============ */}
      <section className="mb-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-2xl font-bold text-white shadow-xl shadow-emerald-500/20">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={userName}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-white">{userName}</h2>
            <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-1">
              <Mail size={13} />
              {session?.user?.email}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {formData.experience && (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {formData.experience}
                </span>
              )}
              {formData.primaryMarket && (
                <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  {formData.primaryMarket}
                </span>
              )}
              {formData.tradingStyle && (
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  {formatLabel(formData.tradingStyle)}
                </span>
              )}
            </div>
          </div>

          {/* Completion Ring */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative h-16 w-16">
              <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="rgba(51, 65, 85, 0.5)"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="url(#profileGradient)"
                  strokeWidth="3"
                  strokeDasharray={`${completionPercent} 100`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="profileGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {completionPercent}%
                </span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Complete
            </p>
          </div>
        </div>
      </section>

      {/* ============ VIEW MODE ============ */}
      {!isEditing && (
        <div className="space-y-6">
          {/* Personal Info */}
          <ViewSection title="Personal Information" icon={User} color="emerald">
            <ViewRow label="Full Name" value={formData.fullName} />
            <ViewRow
              label="Email"
              value={
                <span className="flex items-center gap-1.5">
                  <Mail size={12} className="text-slate-500" />
                  {session?.user?.email}
                </span>
              }
            />
            <ViewRow
              label="Bio"
              value={
                formData.bio ? (
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {formData.bio}
                  </p>
                ) : null
              }
            />
          </ViewSection>

          {/* Trading Identity */}
          <ViewSection
            title="Trading Identity"
            icon={Briefcase}
            color="blue"
          >
            <ViewRow
              label="Experience"
              value={formatLabel(formData.experience)}
            />
            <ViewRow
              label="Primary Market"
              value={formatLabel(formData.primaryMarket)}
            />
            <ViewRow
              label="Trading Style"
              value={formatLabel(formData.tradingStyle)}
            />
            <ViewRow
              label="Risk Preference"
              value={formatLabel(formData.riskPreference)}
            />
          </ViewSection>

          {/* Sessions & Account */}
          <ViewSection title="Sessions & Account" icon={Clock} color="amber">
            <ViewRow
              label="Trading Sessions"
              value={
                formData.tradingSessions.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {formatSessions(formData.tradingSessions).map((s, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-md border border-blue-500/20 bg-blue-500/5 px-2 py-0.5 text-xs text-blue-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ) : null
              }
            />
            <ViewRow label="Base Currency" value={formData.baseCurrency} />
            <ViewRow
              label="Account Size"
              value={
                formData.accountSize
                  ? `${formData.baseCurrency} ${Number(formData.accountSize).toLocaleString()}`
                  : null
              }
              mono
            />
            <ViewRow label="Timezone" value={formData.timezone} />
          </ViewSection>

          {/* Goals */}
          <ViewSection title="Trading Goals" icon={Target} color="purple">
            <ViewRow
              label="Goals"
              value={
                formData.goals ? (
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {formData.goals}
                  </p>
                ) : null
              }
            />
          </ViewSection>

          {/* Psychology Focus */}
          <ViewSection
            title="Psychology Focus"
            icon={Brain}
            color="rose"
          >
            <ViewRow
              label="Focus Areas"
              value={
                formData.psychologyFocus.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {formatPsychology(formData.psychologyFocus).map((f, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-md border border-purple-500/20 bg-purple-500/5 px-2.5 py-1 text-xs text-purple-400"
                      >
                        <Brain size={10} />
                        {f}
                      </span>
                    ))}
                  </div>
                ) : null
              }
            />
          </ViewSection>

          {/* Bottom Edit Button */}
          <div className="flex items-center justify-end pt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-900 hover:border-emerald-500/30 hover:text-emerald-400 transition"
            >
              <Edit3 size={16} />
              Edit Profile
            </button>
          </div>
        </div>
      )}

      {/* ============ EDIT MODE ============ */}
      {isEditing && (
        <div className="space-y-6">
          {/* 1. Personal Information */}
          <Section
            title="Personal Information"
            description="Basic details about you"
            icon={User}
            color="emerald"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Bio / About You
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  maxLength={500}
                  placeholder="Tell us about your trading journey..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition resize-none"
                />
                <p className="text-[10px] text-slate-500 mt-1 text-right">
                  {formData.bio.length}/500
                </p>
              </div>
            </div>
          </Section>

          {/* 2. Trading Experience */}
          <Section
            title="Trading Experience"
            description="Your level of experience"
            icon={Award}
            color="blue"
          >
            <OptionPill
              options={[
                { value: "beginner", label: "Beginner" },
                { value: "intermediate", label: "Intermediate" },
                { value: "advanced", label: "Advanced" },
              ]}
              value={formData.experience}
              onChange={(v) => setFormData({ ...formData, experience: v })}
              color="blue"
            />
          </Section>

          {/* 3. Primary Market */}
          <Section
            title="Primary Market"
            description="What do you trade most often?"
            icon={TrendingUp}
            color="emerald"
          >
            <OptionPill
              options={[
                { value: "forex", label: "Forex" },
                { value: "crypto", label: "Crypto" },
                { value: "stocks", label: "Stocks" },
                { value: "indices", label: "Indices" },
                { value: "commodities", label: "Commodities" },
              ]}
              value={formData.primaryMarket}
              onChange={(v) => setFormData({ ...formData, primaryMarket: v })}
              color="emerald"
            />
          </Section>

          {/* 4. Trading Style */}
          <Section
            title="Trading Style"
            description="Your preferred approach"
            icon={Zap}
            color="amber"
          >
            <OptionPill
              options={[
                { value: "scalping", label: "Scalping" },
                { value: "day_trading", label: "Day Trading" },
                { value: "swing_trading", label: "Swing Trading" },
                { value: "position_trading", label: "Position Trading" },
              ]}
              value={formData.tradingStyle}
              onChange={(v) => setFormData({ ...formData, tradingStyle: v })}
              color="amber"
            />
          </Section>

          {/* 5. Preferred Sessions */}
          <Section
            title="Preferred Trading Sessions"
            description="When do you usually trade?"
            icon={Clock}
            color="blue"
          >
            <MultiSelectChips
              options={[
                { value: "london", label: "🌍 London" },
                { value: "new_york", label: "🗽 New York" },
                { value: "asian", label: "🌸 Asian" },
              ]}
              selected={formData.tradingSessions}
              onToggle={toggleSession}
              color="blue"
            />
          </Section>

          {/* 6. Risk Preference */}
          <Section
            title="Risk Preference"
            description="How do you approach risk?"
            icon={Shield}
            color="rose"
          >
            <OptionPill
              options={[
                { value: "conservative", label: "🛡️ Conservative" },
                { value: "moderate", label: "⚖️ Moderate" },
                { value: "aggressive", label: "🔥 Aggressive" },
              ]}
              value={formData.riskPreference}
              onChange={(v) => setFormData({ ...formData, riskPreference: v })}
              color="rose"
            />
          </Section>

          {/* 7. Account Details */}
          <Section
            title="Account Details"
            description="Currency and account size"
            icon={DollarSign}
            color="emerald"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Base Currency
                </label>
                <select
                  value={formData.baseCurrency}
                  onChange={(e) =>
                    setFormData({ ...formData, baseCurrency: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none cursor-pointer"
                >
                  {["USD", "EUR", "GBP", "KES", "JPY", "AUD", "CAD", "CHF"].map(
                    (c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Account Size
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.accountSize}
                  onChange={(e) =>
                    setFormData({ ...formData, accountSize: e.target.value })
                  }
                  placeholder="e.g. 10000"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Timezone
                </label>
                <input
                  type="text"
                  value={formData.timezone}
                  onChange={(e) =>
                    setFormData({ ...formData, timezone: e.target.value })
                  }
                  placeholder="e.g. Africa/Nairobi"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-3">
              Your account size is private and only used to help calculate risk
              percentages.
            </p>
          </Section>

          {/* 8. Trading Goals */}
          <Section
            title="Trading Goals"
            description="What do you want to achieve?"
            icon={Target}
            color="purple"
          >
            <textarea
              rows={3}
              value={formData.goals}
              onChange={(e) =>
                setFormData({ ...formData, goals: e.target.value })
              }
              placeholder="e.g. Achieve 2% monthly returns, reduce drawdown, master psychology..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-purple-500/50 focus:outline-none resize-none"
            />
          </Section>

          {/* 9. Psychology Focus */}
          <Section
            title="Psychology Focus Areas"
            description="What do you want to improve?"
            icon={Brain}
            color="purple"
          >
            <MultiSelectChips
              options={[
                { value: "discipline", label: "Discipline" },
                { value: "fomo", label: "FOMO" },
                { value: "revenge_trading", label: "Revenge Trading" },
                { value: "overtrading", label: "Overtrading" },
                { value: "patience", label: "Patience" },
                { value: "emotional_control", label: "Emotional Control" },
                { value: "confidence", label: "Confidence" },
                { value: "accepting_losses", label: "Accepting Losses" },
              ]}
              selected={formData.psychologyFocus}
              onToggle={togglePsychology}
              color="purple"
            />
          </Section>

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-900 hover:text-white transition"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              {savedIndicator ? (
                <>
                  <CheckCircle2 size={16} />
                  Profile Saved!
                </>
              ) : (
                <>
                  <Save size={16} />
                  {saving ? "Saving..." : "Save Profile"}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}