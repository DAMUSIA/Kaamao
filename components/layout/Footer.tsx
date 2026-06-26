"use client";

import Link from "next/link";
import Image from "next/image";
import { Share2 } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

interface FooterProps {
  onShowToast: (msg: string) => void;
}

// Social links - easily updateable
const SOCIAL_LINKS = {
  instagram: "#",
  twitter: "#",
  linkedin: "#",
};

export default function Footer({ onShowToast }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleShare = async () => {
    const shareData = {
      title: "GullyGig - Find Trusted Local Service Providers",
      text: "Discover verified tutors, cooks, babysitters, and skilled professionals near you on GullyGig!",
      url:
        typeof window !== "undefined"
          ? window.location.origin
          : "https://gullygig.in",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled or failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        onShowToast("Link copied to clipboard! Share it with your friends.");
      } catch (err) {
        console.error("Failed to copy link:", err);
        onShowToast("Share failed. Please try again.");
      }
    }
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 py-10 transition-colors duration-300">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left - Brand */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="flex items-center justify-center md:justify-start mb-4"
            >
              {/* 
                 LOGO SIZE CONFIGURATION (Mobile Responsive):
                 - Mobile: h-7 w-24 (28px height, 96px width)
                 - Tablet/Desktop (sm and up): h-8 sm:h-9 w-28 sm:w-32 (32px/36px height)
                 You can adjust these classes (e.g. h-7, w-24, sm:h-8, sm:w-28) to fit your logo's dimensions.
              */}
              <div className="relative h-12 w-26 sm:h-28 sm:w-28 overflow-hidden flex-shrink-0">
                {/* Light theme logo: Shown by default, hidden when dark class is on parent */}
                <Image
                  src="/logo_dark.png"
                  alt="Logo"
                  fill
                  className="object-contain object-center md:object-left dark:hidden"
                />
                {/* Dark theme logo: Hidden by default, shown when dark class is on parent */}
                <Image
                  src="/logo_light.png"
                  alt="Logo"
                  fill
                  className="object-contain object-center md:object-left hidden dark:block"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w mx-auto md:mx-0">
              Discover trusted local professionals and skilled workers near you.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2.5 mt-4 flex-wrap">
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-105 active:scale-95 shadow-md shadow-blue-500/20 cursor-pointer flex-shrink-0"
                aria-label="Share GullyGig"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
                aria-label="Instagram"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
                aria-label="Twitter"
              >
                <FaTwitter className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
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
            &copy; {currentYear} GullyGig • Mumbai, India
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
  );
}
