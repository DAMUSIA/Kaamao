"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, Shield, ArrowLeft, Share2 } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");

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
            <button
              onClick={() => setActiveTab("terms")}
              className={`text-sm font-bold transition-colors relative py-1.5 
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-600 after:transition-transform after:duration-300
                ${
                  activeTab === "terms"
                    ? "text-blue-600 dark:text-blue-400 after:scale-x-100 after:origin-bottom-left"
                    : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100"
                }`}
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Terms of Service
              </span>
            </button>
            <button
              onClick={() => setActiveTab("privacy")}
              className={`text-sm font-bold transition-colors relative py-1.5 
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-600 after:transition-transform after:duration-300
                ${
                  activeTab === "privacy"
                    ? "text-blue-600 dark:text-blue-400 after:scale-x-100 after:origin-bottom-left"
                    : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100"
                }`}
            >
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy Policy
              </span>
            </button>
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
          {/* Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-900/30 rounded-xl border border-slate-200 dark:border-slate-800 p-8 min-h-[400px] mt-6"
          >
            {activeTab === "terms" ? (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Terms of Service
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  This page is currently being updated. Please check back soon
                  for our complete Terms of Service.
                </p>
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-400">
                    📝 Last updated:{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Privacy Policy
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  This page is currently being updated. Please check back soon
                  for our complete Privacy Policy.
                </p>
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-400">
                    🔒 Last updated:{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 py-10 transition-colors duration-300">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left - Brand */}
            <div className="text-center md:text-left">
              <Link
                href="/"
                className="flex items-center justify-center md:justify-start gap-2 mb-4"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="GullyGig Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-slate-800 dark:text-white">
                  GullyGig
                </span>
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w mx-auto md:mx-0">
                Discover trusted local professionals and skilled workers near
                you.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2.5 mt-4 flex-wrap">
                <button
                  onClick={() => {
                    const shareData = {
                      title: "GullyGig - Find Trusted Local Service Providers",
                      text: "Discover verified tutors, cooks, babysitters, and skilled professionals near you on GullyGig!",
                      url:
                        typeof window !== "undefined"
                          ? window.location.origin
                          : "https://gullygig.in",
                    };
                    if (navigator.share) {
                      navigator.share(shareData).catch(() => {});
                    } else {
                      navigator.clipboard
                        .writeText(shareData.url)
                        .then(() => {
                          // Show toast or notification
                        })
                        .catch(() => {});
                    }
                  }}
                  className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-105 active:scale-95 shadow-md shadow-blue-500/20 cursor-pointer flex-shrink-0"
                  aria-label="Share GullyGig"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right - Quick Links */}
            <div className="flex flex-col items-center md:items-end">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-center md:text-right">
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Our Team
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-100 dark:border-slate-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} GullyGig • Mumbai, India
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
              <Link
                href="/terms"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy
              </Link>
              <span>•</span>
              <Link
                href="/terms"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
