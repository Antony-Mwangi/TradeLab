'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { 
  ArrowRight, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  TrendingUp,
  ArrowLeft,
  User,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Rocket,
  Star,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        setIsLoading(false);
        return;
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Account created but login failed. Please try logging in.');
        setIsLoading(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      setError('Something went wrong');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Animated background orbs */}
      <div className="fixed -left-48 -top-48 h-[400px] w-[400px] lg:h-[600px] lg:w-[600px] rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-emerald-500/20 blur-3xl animate-float" />
      <div className="fixed -bottom-48 -right-48 h-[400px] w-[400px] lg:h-[600px] lg:w-[600px] rounded-full bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-emerald-500/15 blur-3xl animate-float animation-delay-600" />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] lg:h-[500px] lg:w-[500px] rounded-full bg-gradient-to-r from-emerald-400/5 to-cyan-400/5 blur-3xl animate-pulse-slow" />
      
      {/* Floating particles - hidden on mobile */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float-subtle animation-delay-200">
          <Star className="h-4 w-4 text-emerald-300/20" />
        </div>
        <div className="absolute top-40 right-20 animate-float-subtle animation-delay-400">
          <Star className="h-3 w-3 text-cyan-300/20" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float-subtle animation-delay-600">
          <Star className="h-5 w-5 text-purple-300/15" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float-subtle animation-delay-800">
          <Star className="h-3 w-3 text-amber-300/15" />
        </div>
        <div className="absolute bottom-20 right-1/4 animate-float-subtle animation-delay-1000">
          <Star className="h-4 w-4 text-emerald-300/10" />
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col lg:flex-row">
        {/* Left Side - Form */}
        <div className="flex w-full flex-col justify-center px-4 sm:px-6 py-8 sm:py-12 lg:w-1/2 lg:px-8 xl:px-12">
          <div className="mx-auto w-full max-w-md">
            {/* Back to home */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-emerald-400 transition-colors group"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 group-hover:-translate-x-1 transition-transform" />
              Back to home
            </Link>

            {/* Logo */}
            <div className="mt-6 sm:mt-8">
              <Link href="/" className="inline-flex items-center gap-2 sm:gap-3 group">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-emerald-500/40">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  Trade<span className="text-emerald-400">Lab</span>
                </span>
              </Link>
            </div>

            {/* Header */}
            <div className="mt-6 sm:mt-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white animate-fade-up">
                Create your account
              </h2>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-400 animate-fade-up animation-delay-200">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 sm:p-4 text-xs sm:text-sm text-red-400 animate-fade-up">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
              {/* Full Name */}
              <div className="animate-fade-up animation-delay-300">
                <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Full name
                </label>
                <div className="relative mt-1 sm:mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="block w-full rounded-lg sm:rounded-xl border border-gray-800 bg-gray-900/50 px-3 sm:px-4 py-2.5 sm:py-3.5 pl-9 sm:pl-12 text-sm sm:text-base text-white placeholder-gray-500 transition-all duration-300 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-900"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="animate-fade-up animation-delay-400">
                <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Email address
                </label>
                <div className="relative mt-1 sm:mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-lg sm:rounded-xl border border-gray-800 bg-gray-900/50 px-3 sm:px-4 py-2.5 sm:py-3.5 pl-9 sm:pl-12 text-sm sm:text-base text-white placeholder-gray-500 transition-all duration-300 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-900"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="animate-fade-up animation-delay-500">
                <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative mt-1 sm:mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="block w-full rounded-lg sm:rounded-xl border border-gray-800 bg-gray-900/50 px-3 sm:px-4 py-2.5 sm:py-3.5 pl-9 sm:pl-12 pr-10 sm:pr-12 text-sm sm:text-base text-white placeholder-gray-500 transition-all duration-300 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-900"
                    placeholder="Min 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
                <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-gray-500">
                  Must be at least 8 characters with a mix of letters and numbers
                </p>
              </div>

              {/* Confirm Password */}
              <div className="animate-fade-up animation-delay-600">
                <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Confirm password
                </label>
                <div className="relative mt-1 sm:mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="block w-full rounded-lg sm:rounded-xl border border-gray-800 bg-gray-900/50 px-3 sm:px-4 py-2.5 sm:py-3.5 pl-9 sm:pl-12 pr-10 sm:pr-12 text-sm sm:text-base text-white placeholder-gray-500 transition-all duration-300 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-gray-900"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 sm:gap-3 animate-fade-up animation-delay-700">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded border-gray-700 bg-gray-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 focus:ring-offset-gray-900"
                />
                <label htmlFor="terms" className="text-[10px] sm:text-sm text-gray-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold">
                    Terms of Service
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !agreeTerms}
                className="group relative flex w-full items-center justify-center gap-2 sm:gap-3 overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 sm:py-4 text-sm sm:text-lg font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/30 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed animate-fade-up animation-delay-800"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-4 w-4 sm:h-6 sm:w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span className="text-sm sm:text-base">Creating account...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">Create free account</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </>
                )}
                <span className="absolute inset-0 -z-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-shimmer" />
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 animate-fade-up animation-delay-900">
              <div className="flex-1 border-t border-gray-800" />
              <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Or continue with</span>
              <div className="flex-1 border-t border-gray-800" />
            </div>

            {/* Social Signup - Google Only */}
            <div className="mt-4 sm:mt-6 animate-fade-up animation-delay-1000">
              <button
                onClick={handleGoogleSignIn}
                className="group flex w-full items-center justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-gray-800 bg-gray-900/50 px-4 py-2.5 sm:py-3.5 text-sm sm:text-base font-semibold text-gray-300 transition-all duration-300 hover:scale-[1.02] hover:border-gray-700 hover:bg-gray-900 hover:text-white active:scale-95"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm sm:text-base">Continue with Google</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Features Badge */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500 animate-fade-up animation-delay-1100">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                <span>Secure & private</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                <span>No credit card</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Content (Hidden on mobile, shown on lg+) */}
        <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:px-8 xl:px-12 relative overflow-hidden min-h-screen">
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-purple-500/5" />
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl animate-float animation-delay-600" />

          <div className="relative max-w-lg text-center">
            <div className="relative">
              {/* Glowing orb behind icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-48 w-48 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-2xl animate-pulse-slow" />
              </div>
              
              <div className="relative mx-auto flex h-28 w-28 xl:h-32 xl:w-32 items-center justify-center rounded-2xl xl:rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-2xl shadow-emerald-500/30 transition-all duration-500 hover:scale-110 hover:shadow-emerald-500/50">
                <Rocket className="h-14 w-14 xl:h-16 xl:w-16 text-white animate-bounce-subtle" />
              </div>
              
              <h3 className="mt-8 xl:mt-10 text-3xl xl:text-4xl font-extrabold text-white animate-fade-up">
                Start your <br />
                <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">trading journey</span>
              </h3>
              
              <p className="mt-3 xl:mt-4 text-base xl:text-lg text-gray-400 leading-relaxed animate-fade-up animation-delay-200">
                Join thousands of traders who use TradeLab to understand 
                their performance and improve their process.
              </p>

              <div className="mt-8 xl:mt-10 space-y-3 xl:space-y-4 text-left animate-fade-up animation-delay-300">
                {[
                  "Free forever - no credit card required",
                  "Journal your trades in seconds",
                  "Access powerful analytics",
                  "Track your trading psychology"
                ].map((item, i) => (
                  <div key={i} className="group flex items-center gap-3 xl:gap-4 rounded-xl border border-gray-800 bg-gray-900/30 p-3 xl:p-4 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-gray-900/50 hover:scale-[1.02]">
                    <CheckCircle2 className="h-5 w-5 xl:h-6 xl:w-6 text-emerald-400 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-sm xl:text-base text-gray-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 xl:mt-10 rounded-xl border border-gray-800 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 p-5 xl:p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/10 animate-fade-up animation-delay-400">
                <div className="flex items-center gap-0.5 justify-center mb-2 xl:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 xl:h-6 xl:w-6 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm xl:text-base text-gray-400 leading-relaxed">
                  "The best tool I've found for tracking my trading performance."
                </p>
                <p className="mt-1.5 xl:mt-2 text-sm xl:text-base font-bold text-white">
                  — Michael Rodriguez, Swing Trader
                </p>
              </div>

              <div className="mt-6 xl:mt-8 flex items-center justify-center gap-2 xl:gap-3 text-xs xl:text-sm text-gray-500 animate-fade-up animation-delay-500">
                <span className="inline-flex h-2 w-2 xl:h-2.5 xl:w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium">2,500+ traders use TradeLab</span>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 xl:-top-10 xl:-left-10 animate-float-subtle animation-delay-200">
                <Sparkles className="h-5 w-5 xl:h-6 xl:w-6 text-emerald-400/30" />
              </div>
              <div className="absolute -bottom-8 -right-8 xl:-bottom-10 xl:-right-10 animate-float-subtle animation-delay-400">
                <Zap className="h-5 w-5 xl:h-6 xl:w-6 text-cyan-400/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}