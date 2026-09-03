'use client';

import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Database,
  Server,
  Cookie,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Clock,
  Users,
  FileText,
  Globe,
  AlertCircle,
  Fingerprint,
  HardDrive,
  MailCheck,
  UserCheck,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 3, 2026";

  const sections = [
    {
      id: "introduction",
      icon: Shield,
      title: "Introduction",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            At TradeLab, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our trading analytics platform. 
            Please read this privacy policy carefully. If you do not agree with the terms of this 
            privacy policy, please do not access the platform.
          </p>
          <p className="text-gray-400 leading-relaxed">
            We are committed to protecting your personal information and your right to privacy. 
            If you have any questions or concerns about our policy, or our practices with regards 
            to your personal information, please contact us at <span className="text-emerald-400">support@tradelab.com</span>.
          </p>
        </div>
      )
    },
    {
      id: "information-collection",
      icon: Database,
      title: "Information We Collect",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            We collect information that you provide directly to us when you:
          </p>
          <ul className="space-y-3">
            {[
              "Create an account or register for our services",
              "Update your profile information",
              "Use our trading journal and analytics features",
              "Communicate with us via email or chat",
              "Participate in surveys or promotions"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-400 leading-relaxed mt-4">
            The types of information we may collect include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {[
              "Full name and email address",
              "Trading experience and preferences",
              "Trading journal entries",
              "Performance analytics data",
              "IP address and browser information",
              "Device and usage data",
              "Profile photo (if uploaded)",
              "Communication preferences"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900/30 px-3 py-2 text-sm text-gray-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "how-we-use",
      icon: Server,
      title: "How We Use Your Information",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            We use the information we collect to:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Provide and maintain our platform",
              "Personalize your trading experience",
              "Generate performance analytics",
              "Improve our services",
              "Communicate with you about updates",
              "Enhance platform security",
              "Conduct research and analysis",
              "Prevent fraudulent activities"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3">
                <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-400 leading-relaxed">
            We will not use your trading data for any purpose other than providing and improving 
            your experience on TradeLab. Your trading strategies and journal entries remain 
            confidential to you.
          </p>
        </div>
      )
    },
    {
      id: "data-security",
      icon: Lock,
      title: "Data Security",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your 
            personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Lock,
                title: "Encryption",
                desc: "All data is encrypted in transit and at rest"
              },
              {
                icon: Fingerprint,
                title: "Authentication",
                desc: "Secure authentication and access controls"
              },
              {
                icon: HardDrive,
                title: "Backup",
                desc: "Regular secure backups of your data"
              }
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-gray-800 bg-gray-900/30 p-4 text-center">
                <item.icon className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            While we strive to protect your personal information, no method of transmission over the 
            internet or electronic storage is 100% secure. We cannot guarantee absolute security.
          </p>
        </div>
      )
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "Cookies and Tracking",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            We use cookies and similar tracking technologies to enhance your experience on our platform.
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Essential Cookies",
                desc: "Required for basic platform functionality and authentication"
              },
              {
                title: "Preference Cookies",
                desc: "Remember your settings and preferences"
              },
              {
                title: "Analytics Cookies",
                desc: "Help us understand how you interact with our platform"
              }
            ].map((cookie, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3">
                <Cookie className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{cookie.title}</h4>
                  <p className="text-xs text-gray-500">{cookie.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            You can manage your cookie preferences through your browser settings. However, disabling 
            cookies may affect some platform functionality.
          </p>
        </div>
      )
    },
    {
      id: "data-sharing",
      icon: Users,
      title: "Data Sharing and Disclosure",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            We do not sell, trade, or rent your personal information to third parties. We may share 
            your information in the following circumstances:
          </p>
          <ul className="space-y-3">
            {[
              "With service providers who assist in platform operation",
              "To comply with legal obligations or regulatory requirements",
              "To protect the rights and safety of TradeLab and its users",
              "With your explicit consent"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-400 leading-relaxed text-sm">
            Any third-party service providers are contractually obligated to protect your data and 
            use it only for the purposes specified by TradeLab.
          </p>
        </div>
      )
    },
    {
      id: "user-rights",
      icon: UserCheck,
      title: "Your Privacy Rights",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            You have the following rights regarding your personal information:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Access",
                desc: "Request access to your personal data"
              },
              {
                title: "Correction",
                desc: "Request correction of inaccurate data"
              },
              {
                title: "Deletion",
                desc: "Request deletion of your personal data"
              },
              {
                title: "Portability",
                desc: "Request transfer of your data"
              }
            ].map((right, index) => (
              <div key={index} className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{right.title}</h4>
                  <p className="text-xs text-gray-500">{right.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            To exercise any of these rights, please contact us at <span className="text-emerald-400">support@tradelab.com</span>. 
            We will respond to your request within 30 days.
          </p>
        </div>
      )
    },
    {
      id: "data-retention",
      icon: Clock,
      title: "Data Retention",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            We retain your personal information for as long as necessary to provide our services, 
            comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>
          <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-emerald-400" />
              <div>
                <h4 className="text-sm font-semibold text-white">Account Data</h4>
                <p className="text-xs text-gray-500">
                  Retained until you delete your account or request removal
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            You can request deletion of your account and associated data at any time by contacting 
            our support team.
          </p>
        </div>
      )
    },
    {
      id: "children-privacy",
      icon: Shield,
      title: "Children's Privacy",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            TradeLab is not intended for use by individuals under the age of 18. We do not knowingly 
            collect personal information from children under 18. If we become aware that we have 
            collected personal information from a child under 18, we will take steps to delete it.
          </p>
          <div className="flex items-center gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <AlertCircle className="h-5 w-5 text-amber-400 shrink-0" />
            <span className="text-sm text-amber-400">
              If you are a parent or guardian and believe your child has provided us with personal 
              information, please contact us immediately.
            </span>
          </div>
        </div>
      )
    },
    {
      id: "changes",
      icon: FileText,
      title: "Changes to This Policy",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new policy on this page and updating the "Last Updated" date.
          </p>
          <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3">
            <Clock className="h-5 w-5 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-white">Last Updated</h4>
              <p className="text-sm text-gray-400">{lastUpdated}</p>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            We encourage you to review this policy periodically to stay informed about how we are 
            protecting your information.
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
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-semibold tracking-wide">Privacy Policy</span>
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400 animate-spin-slow" />
                </div>
              </div>

              <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight animate-fade-up">
                Your Privacy
                <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer-text mt-2">
                  Matters to Us
                </span>
              </h1>

              <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg lg:text-xl text-gray-400 animate-fade-up animation-delay-200">
                Learn how TradeLab collects, uses, and protects your personal information. 
                We are committed to transparency and data privacy.
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

        {/* Table of Contents */}
        <section className="border-t border-gray-800 bg-gradient-to-b from-black to-gray-950 py-8 sm:py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-base sm:text-lg font-semibold text-white">Quick Navigation</h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {sections.map((section) => (
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

        {/* Privacy Policy Sections */}
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

        {/* Contact Section */}
        <section className="border-t border-gray-800 bg-gradient-to-b from-black to-gray-950 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-block mb-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm text-emerald-400">
                  <MailCheck className="h-4 w-4" />
                  Questions?
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Have Questions About Your Privacy?
              </h2>
              <p className="mt-3 text-base text-gray-400 max-w-2xl mx-auto">
                If you have any questions, concerns, or requests regarding your privacy, 
                please don't hesitate to reach out to us.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span className="text-white">support@tradelab.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span className="text-white">Nairobi, Kenya</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="border-t border-gray-800 bg-black py-8">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-xs text-gray-600">
              This Privacy Policy applies to all services provided by TradeLab. By using our platform, 
              you agree to the collection and use of information in accordance with this policy.
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <span className="text-gray-700">·</span>
              <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
              <span className="text-gray-700">·</span>
              <Link href="/cookies" className="hover:text-emerald-400 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}