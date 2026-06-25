"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Database,
  Clock,
  Mail,
  MapPin,
  CheckCircle,
  Users,
  Cookie,
  FileText,
  Scale,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Top Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl shadow-sm">
        <nav className="mx-auto flex h-[72px] max-w-container-max items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden"
            >
              <Image
                src="/logo.png"
                alt="GullyGig Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </motion.div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">
              GullyGig
            </span>
          </Link>

          {/* Nav links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-bold transition-colors relative py-1.5 
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-600 after:transition-transform after:duration-300
                text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100"
            >
              Home
            </Link>
            <Link
              href="/terms/service"
              className="text-sm font-bold transition-colors relative py-1.5 
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-600 after:transition-transform after:duration-300
                text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100"
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Terms of Service
              </span>
            </Link>
            <Link
              href="/terms/privacy"
              className="text-sm font-bold transition-colors relative py-1.5 
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-600 after:transition-transform after:duration-300
                text-blue-600 dark:text-blue-400 after:scale-x-100 after:origin-bottom-left"
            >
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy Policy
              </span>
            </Link>
          </div>

          {/* Back to Home Button */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="pt-[88px] px-4 sm:px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 mt-6"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                  Privacy Policy
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  GullyGig Connect | Effective Date: July 1, 2025 | Last
                  Updated: June 22, 2025
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
              This Privacy Policy explains how GullyGig Connect collects, uses,
              stores, shares, and protects the personal information of users who
              access or use the GullyGig Connect platform. By using the
              Platform, you agree to the terms of this Privacy Policy.
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Section 1 */}
            <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  1. Who We Are
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                GullyGig Connect is a hyperlocal service marketplace that
                connects skilled individuals (Service Providers) with customers
                (Service Seekers) for part-time and local services including
                tutoring, tailoring, home cooking, home assistance, and other
                skill-based services. We are based in Mumbai, Maharashtra,
                India.
              </p>
            </section>

            {/* Section 2 */}
            <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  2. Information We Collect
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-2">
                We collect the following categories of personal information:
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                    a) Information You Provide Directly:
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 mt-1">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>Full name and profile photo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>Email address and phone number</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        Residential or service area (city, locality, pin code)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        Skills, qualifications, and service details (for Service
                        Providers)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        Government-issued ID for identity verification (where
                        applicable)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        Payment and bank account details (processed via
                        Razorpay; we do not store card or UPI credentials)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        Reviews, ratings, and messages exchanged on the Platform
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                    b) Information Collected Automatically:
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 mt-1">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        IP address, browser type, and device information
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        Location data (only when you grant permission)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        Usage data: pages visited, time spent, features used
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>Cookies and similar tracking technologies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  3. How We Use Your Information
                </h2>
              </div>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>To create, maintain, and verify your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    To display your profile to potential customers or service
                    providers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    To facilitate communication between Service Providers and
                    Service Seekers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    To process payments and maintain transaction records
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>To enable ratings and reviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    To send service updates, booking confirmations, and
                    important notices
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    To send promotional communications (only with your consent)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    To prevent fraud, abuse, or misuse of the Platform
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    To comply with applicable Indian laws and regulations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    To improve our Platform through analytics and feedback
                  </span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  4. Legal Basis for Processing (India)
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                We process your data in compliance with the Information
                Technology Act, 2000 and the Information Technology (Reasonable
                Security Practices and Procedures and Sensitive Personal Data or
                Information) Rules, 2011. We process data based on: (a) your
                consent, (b) performance of a contract (providing our services),
                (c) legitimate business interests, and (d) compliance with legal
                obligations.
              </p>
            </section>

            {/* Section 5 */}
            <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  5. Sharing of Information
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-2">
                We do not sell your personal information. We may share your
                information in the following limited circumstances:
              </p>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    <span className="font-semibold">With other users:</span>{" "}
                    Your profile, services listed, and reviews are visible to
                    other Platform users as part of the service discovery
                    feature.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    <span className="font-semibold">
                      With payment processors:
                    </span>{" "}
                    Razorpay processes all payments. Their privacy policy
                    governs how they handle your payment data.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    <span className="font-semibold">
                      With service providers:
                    </span>{" "}
                    Cloud hosting (Supabase, Vercel) and analytics providers who
                    are contractually bound to protect your data.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    <span className="font-semibold">
                      With law enforcement or government authorities:
                    </span>{" "}
                    When required by law, court order, or to protect the safety
                    of our users or the public.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    <span className="font-semibold">
                      In a business transfer:
                    </span>{" "}
                    If GullyGig Connect merges, is acquired, or sells assets,
                    your data may be transferred. We will notify you before this
                    happens.
                  </span>
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  6. Data Storage and Security
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Your data is stored on secure servers managed by Supabase
                (PostgreSQL). We implement industry-standard security measures
                including:
              </p>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 mt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Encrypted data transmission using HTTPS/TLS</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Secure authentication via Supabase Auth</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Access controls limiting who can view your data internally
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Regular security reviews</span>
                </li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mt-2">
                However, no system is 100% secure. In the event of a data breach
                that affects your rights, we will notify you within 72 hours as
                per applicable law.
              </p>
            </section>

            {/* Section 7 */}
            <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  7. Data Retention
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                We retain your personal data for as long as your account is
                active or as needed to provide services. Specifically:
              </p>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 mt-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    <span className="font-semibold">Account data:</span>{" "}
                    Retained while your account is active and for 2 years after
                    deletion
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    <span className="font-semibold">Transaction records:</span>{" "}
                    Retained for 7 years to comply with Indian tax and financial
                    laws
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    <span className="font-semibold">Communication logs:</span>{" "}
                    Retained for 1 year for dispute resolution purposes
                  </span>
                </li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mt-2">
                You may request deletion of your account and data at any time
                (see Section 9).
              </p>
            </section>

            {/* Section 8 */}
            <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <Cookie className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  8. Cookies and Tracking
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                We use cookies and similar technologies to:
              </p>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 mt-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Keep you logged in (session cookies)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Remember your preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>
                    Analyze how the Platform is used (analytics cookies)
                  </span>
                </li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mt-2">
                You can disable cookies in your browser settings; however, some
                features of the Platform may not function correctly without
                them.
              </p>
            </section>

            {/* Section 9 */}
            <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  9. Your Rights
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Under applicable Indian law and our policy, you have the right
                to:
              </p>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 mt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Access the personal information we hold about you</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Correct inaccurate or incomplete information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Request deletion of your account and associated data
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Withdraw consent for marketing communications at any time
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Lodge a complaint with a relevant data protection authority
                  </span>
                </li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mt-2">
                To exercise any of these rights, contact us at:
                talktous.at.damusia@gmail.com
              </p>
            </section>

            {/* Section 10 */}
            <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  10. Children&apos;s Privacy
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                The Platform is not intended for children under the age of 18.
                We do not knowingly collect personal information from minors. If
                we become aware that a minor has provided us with personal data,
                we will delete it immediately. Parents or guardians who believe
                their child has used our Platform should contact us.
              </p>
            </section>

            {/* Section 11 */}
            <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                11. Third-Party Links
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                The Platform may contain links to third-party websites or
                services. We are not responsible for the privacy practices or
                content of those third parties. We encourage you to read their
                privacy policies before providing any personal information.
              </p>
            </section>

            {/* Section 12 */}
            <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  12. Changes to This Privacy Policy
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                We may update this Privacy Policy from time to time. When we
                make material changes, we will notify you via email or a
                prominent notice on the Platform at least 7 days before the
                changes take effect. Your continued use of the Platform after
                the effective date constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Section 13 */}
            <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                13. Contact Us
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-2">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy, please contact us:
              </p>
              <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    GullyGig Connect
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>talktous.at.damusia@gmail.com</span>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
