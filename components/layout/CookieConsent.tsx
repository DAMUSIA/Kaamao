"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-6 right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-[1140px] z-[100] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/85 py-3 px-5 md:px-6 rounded-2xl md:rounded-full shadow-2xl shadow-blue-500/10 flex flex-col md:flex-row items-center justify-between gap-3.5 md:gap-6 font-[Manrope,sans-serif]"
        >
          {/* Left part: Icon & Text */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-8 h-8 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center text-brand-primary dark:text-blue-400 shrink-0">
              <Cookie className="h-4.5 w-4.5" />
            </div>
            <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 leading-normal max-w-3xl text-left">
              We use cookies and analytics tools to improve your experience on
              GullyGig. By accepting, you consent to our analytics tracking.
              Learn more in our{" "}
              <Link
                href="/legal?tab=privacy"
                className="text-brand-primary dark:text-blue-400 font-extrabold hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Right part: Actions */}
          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
            <button
              onClick={handleDecline}
              className="flex-1 md:flex-initial px-4 py-2 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-300 font-extrabold text-[11px] rounded-full border border-slate-200/50 dark:border-slate-800/80 transition-all cursor-pointer text-center active:scale-95"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-initial px-5 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-extrabold text-[11px] rounded-full shadow-sm shadow-blue-500/10 transition-all cursor-pointer text-center active:scale-95 whitespace-nowrap"
            >
              Accept Cookies
            </button>

            <button
              onClick={handleDecline}
              title="Close Banner"
              className="hidden md:flex text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 transition-colors p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
