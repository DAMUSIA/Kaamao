"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertCircle,
  Scale,
  Users,
  DollarSign,
  Shield,
  Clock,
  Mail,
  Phone,
  MapPin,
  Star,
} from "lucide-react";

export default function TermsServicePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-16 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/terms"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Legal</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <FileText className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Terms of Service
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8"
        >
          {/* Section 1 - Agreement */}
          <section className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Agreement to Terms
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              By using GullyGig, you agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not use our
              platform. These terms constitute a legally binding agreement
              between you and GullyGig.
            </p>
          </section>

          {/* Section 2 - User Accounts */}
          <section className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                User Accounts
              </h2>
            </div>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  You must be at least 18 years old to create an account on
                  GullyGig.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  You are responsible for maintaining the confidentiality of
                  your account credentials.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  You are solely responsible for all activities that occur under
                  your account.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>
                  You must provide accurate and complete information when
                  creating your account.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 3 - Services */}
          <section className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Services and Transactions
              </h2>
            </div>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 dark:text-indigo-400">•</span>
                <span>
                  GullyGig connects service providers with customers. We
                  facilitate connections but are not a party to the actual
                  service transaction.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 dark:text-indigo-400">•</span>
                <span>
                  Service providers are independent contractors and not
                  employees of GullyGig.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 dark:text-indigo-400">•</span>
                <span>
                  All service prices are set by the service providers unless
                  otherwise specified.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 dark:text-indigo-400">•</span>
                <span>
                  GullyGig may charge a service fee for facilitating
                  transactions.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 4 - User Conduct */}
          <section className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                User Conduct
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400">•</span>
                <span>
                  Post false, misleading, or fraudulent service listings
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400">•</span>
                <span>Harass, abuse, or harm other users</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400">•</span>
                <span>Violate any applicable laws or regulations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400">•</span>
                <span>Attempt to bypass our security measures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400">•</span>
                <span>
                  Use the platform for any illegal or unauthorized purpose
                </span>
              </li>
            </ul>
          </section>

          {/* Section 5 - Reviews and Ratings */}
          <section className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Star className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Reviews and Ratings
              </h2>
            </div>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  Users may leave honest reviews and ratings about their service
                  experiences.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>
                  Reviews must be based on genuine experiences and not contain
                  false information.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>
                  We reserve the right to remove reviews that violate our
                  guidelines.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 6 - Limitation of Liability */}
          <section className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Limitation of Liability
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              GullyGig is provided &quot;as is&quot; and &quot;as
              available&quot; without warranties of any kind. To the maximum
              extent permitted by law, GullyGig shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages,
              or any loss of profits or revenues.
            </p>
          </section>

          {/* Section 7 - Termination */}
          <section className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Termination
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We reserve the right to suspend or terminate your account at our
              discretion, without notice, for conduct that violates these terms
              or is harmful to other users, us, or third parties, or for any
              other reason.
            </p>
          </section>

          {/* Section 8 - Contact */}
          <section className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <div className="space-y-2 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>support@gullygig.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>+91 12345 67890</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
