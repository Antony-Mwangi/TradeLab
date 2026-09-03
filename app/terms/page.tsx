'use client';

import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  FileText,
  CheckCircle2,
  Sparkles,
  Clock,
  Users,
  Server,
  Lock,
  AlertCircle,
  Mail,
  Phone,
  MessageCircle,
  Globe,
  Scale,
  Briefcase,
  DollarSign,
  UserCheck,
  BookOpen,
  Zap,
  ShieldCheck,
  ChevronRight,
  MapPin,  // ← Added MapPin import
} from "lucide-react";

export default function TermsPage() {
  const lastUpdated = "September 3, 2026";

  const sections = [
    {
      id: "acceptance",
      icon: CheckCircle2,
      title: "Acceptance of Terms",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            By accessing and using TradeLab, you agree to be bound by these Terms and Conditions. 
            If you do not agree to these terms, please do not use our platform.
          </p>
          <p className="text-gray-400 leading-relaxed">
            These terms constitute a legally binding agreement between you and TradeLab regarding 
            your use of our trading analytics, journaling, and educational platform.
          </p>
          <div className="flex items-center gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <AlertCircle className="h-5 w-5 text-amber-400 shrink-0" />
            <span className="text-sm text-amber-400">
              By using TradeLab, you confirm that you are at least 18 years old and have the 
              legal capacity to enter into this agreement.
            </span>
          </div>
        </div>
      )
    },
    {
      id: "services",
      icon: Briefcase,
      title: "Our Services",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            TradeLab provides the following services:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: BookOpen,
                title: "Trading Journal",
                desc: "Record and track your trades with detailed entries"
              },
              {
                icon: Server,
                title: "Performance Analytics",
                desc: "Analyze your trading performance with real data"
              },
              {
                icon: Scale,
                title: "Backtesting Tools",
                desc: "Test your strategies against historical data"
              },
              {
                icon: UserCheck,
                title: "Psychology Tracking",
                desc: "Monitor and improve your trading psychology"
              }
            ].map((service, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3">
                <service.icon className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{service.title}</h4>
                  <p className="text-xs text-gray-500">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p className="text-sm text-emerald-400">
              <strong>Important:</strong> TradeLab is an analytical and educational platform. 
              We do not execute trades or provide financial advice. All trading decisions are 
              your own responsibility.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "user-obligations",
      icon: UserCheck,
      title: "User Obligations",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            As a user of TradeLab, you agree to:
          </p>
          <ul className="space-y-3">
            {[
              "Provide accurate and complete information when creating your account",
              "Maintain the security of your account credentials",
              "Use the platform solely for personal, non-commercial purposes",
              "Not share your account with others",
              "Comply with all applicable laws and regulations",
              "Not use the platform for any illegal or unauthorized purpose",
              "Not attempt to reverse engineer or disrupt the platform",
              "Not share or distribute your trading data without authorization"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: "account",
      icon: Lock,
      title: "Account Security",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            You are responsible for maintaining the confidentiality of your account credentials 
            and for all activities that occur under your account.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Shield,
                title: "Password Protection",
                desc: "Use a strong, unique password for your account"
              },
              {
                icon: Clock,
                title: "Session Management",
                desc: "Log out when not using the platform, especially on shared devices"
              },
              {
                icon: AlertCircle,
                title: "Report Suspicious Activity",
                desc: "Immediately report any unauthorized access to us"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3">
                <item.icon className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            TradeLab is not liable for any loss or damage arising from your failure to protect 
            your account credentials.
          </p>
        </div>
      )
    },
    {
      id: "intellectual-property",
      icon: Globe,
      title: "Intellectual Property",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            All content, features, and functionality on TradeLab are owned by TradeLab and are 
            protected by international copyright, trademark, and other intellectual property laws.
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Platform Content",
                desc: "All text, graphics, logos, and software are the property of TradeLab"
              },
              {
                title: "User Data",
                desc: "You retain ownership of your trading data and journal entries"
              },
              {
                title: "Usage Rights",
                desc: "You grant TradeLab a license to use your data to provide and improve services"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3">
                <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "disclaimer",
      icon: AlertCircle,
      title: "Disclaimer of Warranties",
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-red-400">Important Disclaimer</h4>
                <p className="text-sm text-red-400/80 mt-1">
                  TradeLab is provided "as is" and "as available" without any warranties of any kind. 
                  We do not guarantee the accuracy, reliability, or suitability of any information 
                  provided on the platform.
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed">
            The use of TradeLab is at your own risk. We do not provide financial advice, and 
            our analytics should not be construed as investment recommendations.
          </p>
          <ul className="space-y-2">
            {[
              "Trading involves substantial risk of loss",
              "Past performance does not guarantee future results",
              "All trading decisions are your sole responsibility",
              "We are not liable for any financial losses incurred"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: "limitation-liability",
      icon: Scale,
      title: "Limitation of Liability",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            To the maximum extent permitted by law, TradeLab shall not be liable for any indirect, 
            incidental, special, consequential, or punitive damages, including without limitation, 
            loss of profits, data, use, goodwill, or other intangible losses.
          </p>
          <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-4">
            <p className="text-sm text-gray-400">
              <strong className="text-white">Limitations:</strong> In no event shall TradeLab's 
              total liability exceed the amount paid by you, if any, for accessing the platform 
              during the twelve months preceding the claim.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "termination",
      icon: Clock,
      title: "Termination",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            We reserve the right to terminate or suspend your account immediately, without prior 
            notice or liability, for any reason whatsoever, including without limitation if you 
            breach the Terms.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "By You",
                desc: "You may delete your account at any time"
              },
              {
                title: "By Us",
                desc: "We may terminate accounts for violation of terms"
              },
              {
                title: "Data Retention",
                desc: "Your data will be deleted upon account termination"
              },
              {
                title: "Appeals",
                desc: "You can contact us to appeal termination decisions"
              }
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-800 bg-gray-900/30 p-3">
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "governing-law",
      icon: Globe,
      title: "Governing Law",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            These Terms shall be governed and construed in accordance with the laws of Kenya, 
            without regard to its conflict of law provisions.
          </p>
          <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3">
            <MapPin className="h-5 w-5 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-white">Jurisdiction</h4>
              <p className="text-xs text-gray-500">
                Any legal disputes shall be resolved in the courts of Nairobi, Kenya.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "changes",
      icon: FileText,
      title: "Changes to Terms",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            We reserve the right to update or modify these Terms at any time without prior notice. 
            Changes will be effective immediately upon posting on this page.
          </p>
          <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3">
            <Clock className="h-5 w-5 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-white">Last Updated</h4>
              <p className="text-sm text-gray-400">{lastUpdated}</p>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            We encourage you to review these Terms periodically to stay informed of any changes.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated background orbs */}
      <div className="fixed -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 blur-3xl animate-float" />
      <div className="fixed -bottom-48 -right-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-emerald-500/10 blur-3xl animate-float animation-delay-600" />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-emerald-400/5 to-cyan-400/5 blur-3xl animate-pulse-slow" />

      <div className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.06),transparent_50%)]" />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-block animate-float-subtle">
                <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-emerald-400 backdrop-blur-sm shadow-lg shadow-emerald-500/10">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-semibold tracking-wide">Terms & Conditions</span>
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400 animate-spin-slow" />
                </div>
              </div>

              <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight animate-fade-up">
                Terms of
                <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer-text mt-2">
                  Service
                </span>
              </h1>

              <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg lg:text-xl text-gray-400 animate-fade-up animation-delay-200">
                Please read these Terms and Conditions carefully before using TradeLab. 
                By using our platform, you agree to be bound by these terms.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30 active:scale-95"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to Home
                </Link>
                <span className="text-sm text-gray-500">
                  Last Updated: <span className="text-white font-semibold">{lastUpdated}</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Quick Actions */}
        <section className="border-t border-gray-800 bg-gradient-to-b from-black to-gray-950 py-6">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <h3 className="text-sm font-semibold text-gray-400 mr-2">Contact Us:</h3>
              <a
                href="https://wa.me/254711668298"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-4 py-2 text-sm text-green-400 transition-all duration-300 hover:bg-green-500/20 hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="mailto:antonymwangiw85@gmail.com"
                className="group inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-sm text-blue-400 transition-all duration-300 hover:bg-blue-500/20 hover:scale-105"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="tel:+254711668298"
                className="group inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-2 text-sm text-amber-400 transition-all duration-300 hover:bg-amber-500/20 hover:scale-105"
              >
                <Phone className="h-4 w-4" />
                <span>Call</span>
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="border-t border-gray-800 bg-gradient-to-b from-black to-gray-950 py-8 sm:py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-base sm:text-lg font-semibold text-white">Quick Navigation</h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {sections.slice(0, 6).map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="inline-flex items-center gap-1 rounded-full border border-gray-800 bg-gray-900/30 px-3 py-1.5 text-[10px] sm:text-xs text-gray-400 transition-all duration-300 hover:border-emerald-500/30 hover:text-emerald-400 hover:scale-105"
                  >
                    <section.icon className="h-3 w-3" />
                    <span className="hidden sm:inline">{section.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 sm:space-y-12">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/30 to-black/50 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:border-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/5 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                      <section.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                      {section.title}
                    </h2>
                  </div>
                  <div className="pl-0 sm:pl-4">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section with All Methods */}
        <section className="border-t border-gray-800 bg-gradient-to-b from-black to-gray-950 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-block mb-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm text-emerald-400">
                  <MessageCircle className="h-4 w-4" />
                  Get in Touch
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Have Questions About Our Terms?
              </h2>
              <p className="mt-3 text-base text-gray-400 max-w-2xl mx-auto">
                If you have any questions or concerns about our Terms and Conditions, 
                please reach out to us through any of the following channels:
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/254711668298"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-gray-800 bg-gray-900/30 p-6 transition-all duration-300 hover:border-green-500/30 hover:bg-gray-900/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/10"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-400 mb-3 transition-all duration-300 group-hover:scale-110">
                      <MessageCircle className="h-7 w-7" />
                    </div>
                    <h3 className="text-base font-semibold text-white">WhatsApp</h3>
                    <p className="text-sm text-green-400 mt-1">+254 711 668 298</p>
                    <span className="text-xs text-gray-500 mt-2">Click to chat</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:antonymwangiw85@gmail.com"
                  className="group rounded-2xl border border-gray-800 bg-gray-900/30 p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-gray-900/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 mb-3 transition-all duration-300 group-hover:scale-110">
                      <Mail className="h-7 w-7" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Email</h3>
                    <p className="text-sm text-blue-400 mt-1">antonymwangiw85@gmail.com</p>
                    <span className="text-xs text-gray-500 mt-2">We'll respond within 24-48 hours</span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+254711668298"
                  className="group rounded-2xl border border-gray-800 bg-gray-900/30 p-6 transition-all duration-300 hover:border-amber-500/30 hover:bg-gray-900/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/10"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 mb-3 transition-all duration-300 group-hover:scale-110">
                      <Phone className="h-7 w-7" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Phone</h3>
                    <p className="text-sm text-amber-400 mt-1">+254 711 668 298</p>
                    <span className="text-xs text-gray-500 mt-2">Call us directly</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="border-t border-gray-800 bg-black py-8">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-xs text-gray-600">
              By using TradeLab, you agree to these Terms and Conditions. These terms are 
              subject to change without prior notice.
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <span className="text-gray-700">·</span>
              <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
              <span className="text-gray-700">·</span>
              <Link href="/cookies" className="hover:text-emerald-400 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}