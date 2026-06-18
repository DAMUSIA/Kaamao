"use client";

import React, { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  Copy,
  Check,
  QrCode,
  Star,
  MessageSquare,
  Globe,
  MapPin,
  User,
  Sparkles,
  Send,
  Download,
  ShieldCheck,
  Eye,
  Award
} from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface ReviewItem {
  id: string;
  user_id?: string;
  rating: number;
  review: string | null;
  created_at: string;
  users?: {
    full_name: string;
  };
}

interface ServiceData {
  id: string;
  user_id: string;
  title: string;
  category: string;
  description: string;
  service_modes: string[];
  city: string;
  area: string | null;
  availability: string[];
  languages: string[];
  starting_price: number | null;
  price_unit: string | null;
  rating_average: number;
  reviews_count: number;
  likes_count: number;
  contact_numbers?: string[];
  created_at: string;
  users?: {
    full_name: string;
    location: string | null;
    about: string | null;
    phone_no: string | null;
    created_at?: string;
    social_links?: {
      instagram?: string;
      facebook?: string;
      linkedin?: string;
      youtube?: string;
      website?: string;
    };
  };
  service_analytics?: {
    total_views: number;
    total_likes: number;
    total_contacts: number;
  } | null;
}

interface PortfolioPageClientProps {
  initialService: ServiceData;
  initialReviews: ReviewItem[];
  portfolioUrl: string;
}

// Helper functions for deterministic formatting to prevent SSR/hydration locale mismatch
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

const formatMonthYear = (dateStr?: string) => {
  if (!dateStr) return "June 2026";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "June 2026";
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
};

export default function PortfolioPageClient({
  initialService,
  initialReviews,
  portfolioUrl
}: PortfolioPageClientProps) {
  // Theme state: initialized lazily to avoid synchronous setState inside mount effect
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    }
    return false;
  });

  // Auth & Interactions
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalReason, setAuthModalReason] = useState("");

  // DB Sync States
  const [likesCount, setLikesCount] = useState(
    initialService.service_analytics?.total_likes ?? initialService.likes_count ?? 0
  );
  const [viewsCount, setViewsCount] = useState(
    initialService.service_analytics?.total_views ?? 0
  );
  const [isLiked, setIsLiked] = useState(false);

  // Reviews States
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [reviewsCount, setReviewsCount] = useState(initialService.reviews_count || 0);
  const [ratingAverage, setRatingAverage] = useState(initialService.rating_average || 0);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  // UI helpers
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedPhoneIdx, setCopiedPhoneIdx] = useState<number | null>(null);
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  // Apply theme class when darkMode state updates
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Memoized checking of liked status
  const checkIfLiked = React.useCallback(async (accessToken: string) => {
    try {
      const res = await fetch(`/api/likes?serviceId=${initialService.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = await res.json();
      setIsLiked(data.liked);
    } catch (err) {
      console.error("Error checking like status:", err);
    }
  }, [initialService.id]);

  // Auth Check
  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setToken(session.access_token);
        checkIfLiked(session.access_token);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setToken(session.access_token);
        checkIfLiked(session.access_token);
      } else {
        setUser(null);
        setToken(null);
        setIsLiked(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [checkIfLiked]);

  // Check user review completion dynamically during rendering
  const userHasReviewed = !!(
    user &&
    reviews.some(
      (r) =>
        r.users?.full_name === user.user_metadata?.full_name ||
        r.user_id === user.id
    )
  );

  // Log View count (Spam protection included)
  useEffect(() => {
    const key = `portfolio_view_${initialService.id}`;
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const lastViewed = localStorage.getItem(key);

    if (lastViewed !== today) {
      fetch("/api/portfolio-view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: initialService.id })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem(key, today);
            setViewsCount((prev) => prev + 1);
          }
        })
        .catch((err) => console.error("Error logging portfolio view:", err));
    }
  }, [initialService.id]);

  // Toggle Like Action
  const handleLikeToggle = async () => {
    if (!user || !token) {
      setAuthModalReason("save this service to your favorites list");
      setShowAuthModal(true);
      return;
    }

    const nextState = !isLiked;
    setIsLiked(nextState);
    setLikesCount((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceId: initialService.id,
          action: nextState ? "like" : "unlike"
        })
      });
      const data = await res.json();
      if (data.success) {
        setLikesCount(data.likesCount);
      } else {
        // Rollback on fail
        setIsLiked(!nextState);
        setLikesCount((prev) => (!nextState ? prev + 1 : Math.max(0, prev - 1)));
      }
    } catch (err) {
      console.error("Like toggle error:", err);
      setIsLiked(!nextState);
      setLikesCount((prev) => (!nextState ? prev + 1 : Math.max(0, prev - 1)));
    }
  };

  // Review Form Submit Handler
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !token) {
      setAuthModalReason("write a review for this service provider");
      setShowAuthModal(true);
      return;
    }

    if (userRating === 0) {
      alert("Please select a rating score.");
      return;
    }

    setReviewLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceId: initialService.id,
          rating: userRating,
          comment: userComment
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review.");
      }

      setRatingAverage(data.averageRating);
      setReviewsCount(data.totalReviews);
      setUserComment("");
      setUserRating(0);

      // Reload reviews
      if (supabase) {
        const { data: newReviews } = await supabase
          .from("service_ratings")
          .select("*, users:user_id(full_name)")
          .eq("service_id", initialService.id)
          .order("created_at", { ascending: false });
        if (newReviews) setReviews(newReviews);
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string } | null;
      alert(errorObj?.message || "Failed to submit review.");
    } finally {
      setReviewLoading(false);
    }
  };

  // Contacts
  const activeNumbers = initialService.contact_numbers?.length
    ? initialService.contact_numbers
    : (initialService.users?.phone_no ? [initialService.users.phone_no] : []);

  const cleanNumber = (num: string) => num.replace(/\D/g, "");

  // Sharing content generators
  const shareText = `Check out this service on Kaamao: ${initialService.title} by ${
    initialService.users?.full_name || "Verified Tutor"
  } located in ${[initialService.area, initialService.city].filter(Boolean).join(", ")}. Starts from ₹${
    initialService.starting_price ?? "N/A"
  }.`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: initialService.title,
          text: shareText,
          url: portfolioUrl
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      setShowShareDropdown(!showShareDropdown);
    }
  };

  const copyPortfolioUrl = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const copyPhoneToClipboard = async (num: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(num);
      setCopiedPhoneIdx(idx);
      setTimeout(() => setCopiedPhoneIdx(null), 2000);
    } catch (err) {
      console.error("Failed to copy phone:", err);
    }
  };

  // QR Code Download System
  const downloadQrCode = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
      portfolioUrl
    )}`;

    img.onload = () => {
      canvas.width = 280;
      canvas.height = 320;
      if (!ctx) return;

      // Draw background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 280, 320);

      // Draw QR Code
      ctx.drawImage(img, 15, 15, 250, 250);

      // Text label at bottom
      ctx.fillStyle = "#0f172a"; // slate-900
      ctx.font = "bold 13px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Scan to View Portfolio on Kaamao", 140, 295);

      const link = document.createElement("a");
      link.download = `${initialService.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-qr.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  // Rating breakdowns calculator
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const matchCount = reviews.filter((r) => Math.round(r.rating) === stars).length;
    const percentage = reviewsCount > 0 ? (matchCount / reviewsCount) * 100 : 0;
    return { stars, percentage, count: matchCount };
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 font-sans pb-28">
      {/* Light/Dark mode floating switcher */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 flex justify-end gap-3 items-center">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-1.5 rounded-full shadow-xs">
          Kaamao Service Hub
        </span>
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-xs cursor-pointer"
          title="Toggle Light/Dark Theme"
        >
          {darkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-indigo-650" />}
        </button>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-6 space-y-8">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/5 animate-in fade-in duration-300">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-extrabold uppercase tracking-widest rounded-lg border border-blue-500/30">
                <Sparkles className="h-3 w-3" />
                {initialService.category}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-widest rounded-lg border border-emerald-500/30">
                <ShieldCheck className="h-3 w-3" />
                Verified Partner
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-white to-blue-100 bg-clip-text text-transparent">
              {initialService.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3.5 text-xs sm:text-sm font-semibold text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-red-400 shrink-0" />
                <span>{[initialService.area, initialService.city].filter(Boolean).join(", ")}</span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <div className="flex items-center text-amber-400 gap-0.5">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span className="font-extrabold text-white">{ratingAverage.toFixed(1)}</span>
                </div>
                <span className="text-slate-400">({reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Display Stats Row */}
            <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-5 text-[11px] font-bold text-slate-400">
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {viewsCount} Views
              </span>
              <span className="h-3.5 w-[1px] bg-white/10" />
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                {likesCount} Likes
              </span>
            </div>

            {/* Service modes display as pills */}
            {initialService.service_modes.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <span className="block text-[10px] font-extrabold text-slate-450 uppercase tracking-widest">Available Modes</span>
                <div className="flex flex-wrap gap-2">
                  {initialService.service_modes.map((mode) => {
                    const isOnline = mode.toLowerCase().includes("online") || mode.toLowerCase().includes("video");
                    return (
                      <span
                        key={mode}
                        className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${
                          isOnline
                            ? "bg-sky-500/10 border-sky-400/30 text-sky-300"
                            : "bg-indigo-500/10 border-indigo-400/30 text-indigo-300"
                        }`}
                      >
                        {mode}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================= MAIN COLUMN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT 2 COLUMNS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* ABOUT SERVICE */}
            <section className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
              <h3 className="text-lg font-extrabold flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                About Service
              </h3>
              <p className="text-slate-650 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-medium">
                {initialService.description}
              </p>
            </section>

            {/* SERVICE DETAILS GRID */}
            <section className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 sm:p-8 shadow-md space-y-5">
              <h3 className="text-lg font-extrabold">Service Specifications</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/20">
                  <span className="text-[10px] font-extrabold text-slate-405 dark:text-slate-500 uppercase tracking-widest block mb-1">Category</span>
                  <span className="text-sm font-bold text-slate-850 dark:text-slate-200">{initialService.category}</span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/20">
                  <span className="text-[10px] font-extrabold text-slate-405 dark:text-slate-500 uppercase tracking-widest block mb-1">Pricing structure</span>
                  <span className="text-sm font-extrabold text-blue-650 dark:text-blue-400">
                    {initialService.starting_price
                      ? `₹${initialService.starting_price} / ${initialService.price_unit || "hour"}`
                      : "Request Quote"}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/20">
                  <span className="text-[10px] font-extrabold text-slate-405 dark:text-slate-500 uppercase tracking-widest block mb-1">Operation languages</span>
                  <span className="text-sm font-bold text-slate-850 dark:text-slate-200">
                    {initialService.languages?.join(", ") || "English"}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/20">
                  <span className="text-[10px] font-extrabold text-slate-405 dark:text-slate-500 uppercase tracking-widest block mb-1">Availability</span>
                  <span className="text-sm font-bold text-slate-850 dark:text-slate-200">
                    {initialService.availability?.join(", ") || "Flexible hours"}
                  </span>
                </div>
              </div>
            </section>

            {/* CONTACT CARDS */}
            <section className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
              <div>
                <h3 className="text-lg font-extrabold">Instant Contact Channels</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get in touch directly via Call or WhatsApp</p>
              </div>

              {activeNumbers.length === 0 ? (
                <p className="text-xs text-slate-450 italic">No contact numbers attached.</p>
              ) : (
                <div className="space-y-4">
                  {activeNumbers.map((number, idx) => {
                    const cleaned = cleanNumber(number);
                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/20 rounded-2xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <Phone className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-550 uppercase tracking-widest block">
                              Phone number {activeNumbers.length > 1 ? `#${idx + 1}` : ""}
                            </span>
                            <span className="text-sm font-extrabold tracking-tight">{number}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => copyPhoneToClipboard(number, idx)}
                            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl transition cursor-pointer"
                            title="Copy number"
                          >
                            {copiedPhoneIdx === idx ? (
                              <Check className="h-4.5 w-4.5 text-green-500" />
                            ) : (
                              <Copy className="h-4.5 w-4.5" />
                            )}
                          </button>
                          
                          <a
                            href={`tel:${cleaned}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer active:scale-95 shadow-md shadow-blue-500/10"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            <span>Call</span>
                          </a>

                          <a
                            href={`https://wa.me/${cleaned}?text=${encodeURIComponent(
                              `Hello! I saw your service "${initialService.title}" on Kaamao and want to enquire.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition cursor-pointer active:scale-95 shadow-md shadow-emerald-500/10"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* TRUST STATISTICS */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/40 p-5 rounded-2xl text-center shadow-xs hover:scale-102 transition duration-200">
                <span className="text-2xl font-black block text-slate-850 dark:text-slate-100">{viewsCount}</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-450 mt-1 block">Views</span>
              </div>
              <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/40 p-5 rounded-2xl text-center shadow-xs hover:scale-102 transition duration-200">
                <span className="text-2xl font-black block text-red-500">{likesCount}</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-450 mt-1 block">Likes</span>
              </div>
              <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/40 p-5 rounded-2xl text-center shadow-xs hover:scale-102 transition duration-200">
                <span className="text-2xl font-black block text-emerald-600">{reviewsCount}</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-450 mt-1 block">Reviews</span>
              </div>
              <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/40 p-5 rounded-2xl text-center shadow-xs hover:scale-102 transition duration-200">
                <span className="text-2xl font-black block text-amber-500 flex items-center justify-center gap-1">
                  ⭐ {ratingAverage.toFixed(1)}
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-450 mt-1 block">Avg Rating</span>
              </div>
            </section>

            {/* REVIEWS SYSTEM */}
            <section className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Client Reviews & Feedback
                </h3>
                <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                  {reviewsCount} total
                </span>
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  <MessageSquare className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold">No Reviews Yet</p>
                  <p className="text-xs text-slate-500 mt-1">Provider is waiting for their first service rating.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Rating Breakdown card */}
                  <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/20 rounded-2xl p-5 flex flex-col justify-center">
                    <div className="text-center pb-4 border-b border-slate-200/60 dark:border-slate-850 mb-4">
                      <span className="text-4xl font-black block">{ratingAverage.toFixed(1)}</span>
                      <span className="text-xs font-semibold text-slate-500 block mt-1">out of 5 stars</span>
                    </div>

                    <div className="space-y-2">
                      {ratingDistribution.map((row) => (
                        <div key={row.stars} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <span className="w-3 text-right">{row.stars}</span>
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${row.percentage}%` }}
                            />
                          </div>
                          <span className="w-6 text-right font-medium">{row.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews list */}
                  <div className="md:col-span-2 space-y-4 max-h-[380px] overflow-y-auto pr-2">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 border border-slate-100 dark:border-slate-800/60 rounded-2xl space-y-2 bg-white dark:bg-slate-900/50 shadow-xs hover:border-slate-250 transition"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-150/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-extrabold text-xs border border-blue-500/10">
                              {(rev.users?.full_name || "Anonymous").charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <span className="text-xs font-extrabold block">
                                {rev.users?.full_name || "Anonymous"}
                              </span>
                              <div className="flex items-center text-amber-400 gap-0.5 mt-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">
                            {formatDate(rev.created_at)}
                          </span>
                        </div>

                        {rev.review && (
                          <p className="text-xs text-slate-600 dark:text-slate-350 font-medium leading-relaxed bg-slate-50/50 dark:bg-slate-900/20 p-2.5 rounded-lg border border-slate-100/50 dark:border-slate-800/10">
                            {rev.review}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Leave a review form */}
              <div className="border-t border-slate-100 dark:border-slate-800/60 pt-6 space-y-4">
                <h4 className="text-sm font-extrabold">Write a Review</h4>
                {userHasReviewed ? (
                  <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-xs font-semibold text-blue-650 dark:text-blue-400">
                    You have already submitted a review for this service provider. Thank you for your feedback!
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <span className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Select Rating</span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((score) => (
                          <button
                            type="button"
                            key={score}
                            onClick={() => setUserRating(score)}
                            className="p-1 hover:scale-110 active:scale-95 transition cursor-pointer"
                          >
                            <Star
                              className={`h-7 w-7 ${
                                score <= userRating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-300 dark:text-slate-700 hover:text-amber-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="review-comment" className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Share your experience
                      </label>
                      <textarea
                        id="review-comment"
                        rows={3}
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        placeholder="Explain how this provider helped you, what the quality of service was, and any feedback..."
                        className="w-full p-4 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-900 focus:border-blue-500 font-semibold"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={reviewLoading}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-extrabold rounded-2xl shadow-md shadow-blue-500/10 transition cursor-pointer active:scale-98"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>{reviewLoading ? "Posting Review..." : "Submit Review"}</span>
                    </button>
                  </form>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            
            {/* PROVIDER PROFILE CARD */}
            {initialService.users && (
              <section className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 sm:p-8 shadow-md space-y-5">
                <h3 className="text-lg font-extrabold flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Service Provider
                </h3>

                <div className="flex items-center gap-3.5 p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/20 rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-650 text-white rounded-full flex items-center justify-center font-black text-lg shadow-md shrink-0">
                    {initialService.users.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-extrabold truncate">{initialService.users.full_name}</h4>
                    {initialService.users.location && (
                      <div className="flex items-center gap-1 text-xs font-semibold text-slate-550 dark:text-slate-400 mt-0.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{initialService.users.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {initialService.users.about && (
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">About Provider</span>
                    <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-medium">
                      {initialService.users.about}
                    </p>
                  </div>
                )}

                <div className="text-[10px] font-bold text-slate-450 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/60 pt-4 flex justify-between">
                  <span>MEMBER SINCE</span>
                  <span>
                    {formatMonthYear(initialService.users.created_at)}
                  </span>
                </div>

                {/* Social media links */}
                {initialService.users.social_links && Object.keys(initialService.users.social_links).length > 0 && (
                  <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 space-y-2">
                    <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Connect Online</span>
                    <div className="flex flex-wrap gap-2">
                      {initialService.users.social_links.instagram && (
                        <a
                          href={initialService.users.social_links.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-pink-650 hover:bg-pink-500/10 transition cursor-pointer"
                          title="Instagram"
                        >
                          <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                          </svg>
                        </a>
                      )}
                      {initialService.users.social_links.facebook && (
                        <a
                          href={initialService.users.social_links.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-blue-650 hover:bg-blue-500/10 transition cursor-pointer"
                          title="Facebook"
                        >
                          <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                          </svg>
                        </a>
                      )}
                      {initialService.users.social_links.linkedin && (
                        <a
                          href={initialService.users.social_links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-blue-500 hover:bg-blue-400/10 transition cursor-pointer"
                          title="LinkedIn"
                        >
                          <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                            <rect width="4" height="12" x="2" y="9"/>
                            <circle cx="4" cy="4" r="2"/>
                          </svg>
                        </a>
                      )}
                      {initialService.users.social_links.youtube && (
                        <a
                          href={initialService.users.social_links.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-red-650 hover:bg-red-500/10 transition cursor-pointer"
                          title="YouTube"
                        >
                          <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                            <polygon points="10 15 15 12 10 9"/>
                          </svg>
                        </a>
                      )}
                      {initialService.users.social_links.website && (
                        <a
                          href={initialService.users.social_links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-500/10 transition cursor-pointer"
                          title="Website"
                        >
                          <Globe className="h-4.5 w-4.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* QR CODE CARD */}
            <section className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 sm:p-8 shadow-md text-center space-y-5 relative overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-36 h-36 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-1 relative z-10">
                <div className="flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <QrCode className="h-5 w-5" />
                  <span className="text-xs font-extrabold uppercase tracking-widest">Portfolio QR</span>
                </div>
                <h4 className="text-base font-extrabold">Scan to View Portfolio</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Scan to load this portfolio instantly on mobile devices.
                </p>
              </div>

              <div className="relative z-10 inline-flex bg-white p-3.5 rounded-2xl shadow-lg border border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                    portfolioUrl
                  )}`}
                  alt="QR Code"
                  width={140}
                  height={140}
                  className="rounded-lg bg-white block"
                  loading="lazy"
                />
              </div>

              <div className="flex gap-2 relative z-10 pt-2">
                <button
                  onClick={downloadQrCode}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-extrabold rounded-xl transition cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download QR</span>
                </button>
              </div>
            </section>

            {/* SHARE SYSTEM CARD */}
            <section className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
              <h3 className="text-sm font-extrabold">Share Portfolio</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Promote this service across social networks</p>
              
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + "\n" + portfolioUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 dark:border-slate-850 hover:bg-emerald-500/5 text-slate-700 dark:text-slate-200 hover:text-emerald-600 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(portfolioUrl)}&text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 dark:border-slate-850 hover:bg-blue-500/5 text-slate-700 dark:text-slate-200 hover:text-blue-400 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Telegram</span>
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 dark:border-slate-850 hover:bg-blue-500/5 text-slate-700 dark:text-slate-200 hover:text-blue-600 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(portfolioUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 dark:border-slate-850 hover:bg-blue-500/5 text-slate-700 dark:text-slate-200 hover:text-blue-700 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>

              <button
                onClick={copyPortfolioUrl}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-extrabold rounded-xl transition cursor-pointer active:scale-98"
              >
                {copiedUrl ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Portfolio Link</span>
                  </>
                )}
              </button>
            </section>
          </div>
        </div>
      </main>

      {/* ================= STICKY ACTION BAR ================= */}
      {/* Renders at bottom on mobile, and floating on desktop */}
      <div className="fixed bottom-0 sm:bottom-6 left-0 sm:left-1/2 sm:-translate-x-1/2 w-full sm:w-auto sm:max-w-2xl z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-t sm:border border-slate-200 dark:border-slate-850 p-4 sm:px-6 sm:py-3.5 sm:rounded-full shadow-2xl flex items-center justify-between sm:gap-6 animate-in slide-in-from-bottom duration-300">
        
        {/* Price Tag Info on Mobile/Tablet */}
        <div className="flex flex-col text-left shrink-0">
          <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">STARTING AT</span>
          <span className="text-base font-black text-blue-650 dark:text-blue-400">
            {initialService.starting_price ? `₹${initialService.starting_price}` : "Enquire"}
            {initialService.starting_price && initialService.price_unit && (
              <span className="text-[10px] font-normal text-slate-400"> / {initialService.price_unit.replace("per ", "").toLowerCase()}</span>
            )}
          </span>
        </div>

        {/* Action Buttons row */}
        <div className="flex items-center gap-2">
          {/* Like Button */}
          <button
            onClick={handleLikeToggle}
            className={`p-2.5 border rounded-xl sm:rounded-full transition active:scale-90 cursor-pointer ${
              isLiked
                ? "bg-red-50 border-red-200 text-red-500 dark:bg-red-500/10 dark:border-red-500/25"
                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-400 hover:text-red-500"
            }`}
            title="Like this Service"
          >
            <Heart className={`h-4.5 w-4.5 ${isLiked ? "fill-red-500" : ""}`} />
          </button>

          {/* Share Button */}
          <button
            onClick={handleNativeShare}
            className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-650 dark:text-slate-350 rounded-xl sm:rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition active:scale-90 cursor-pointer relative"
            title="Share portfolio"
          >
            <Share2 className="h-4.5 w-4.5" />
            
            {/* Share dropdown fallback if Web Share is not supported */}
            {showShareDropdown && (
              <div className="absolute bottom-12 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 shadow-xl w-48 flex flex-col gap-1 z-50 text-left">
                <button
                  onClick={() => {
                    copyPortfolioUrl();
                    setShowShareDropdown(false);
                  }}
                  className="w-full text-xs font-bold text-slate-700 dark:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-left"
                >
                  Copy Link
                </button>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(portfolioUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-xs font-bold text-slate-700 dark:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-left"
                >
                  Share to WhatsApp
                </a>
              </div>
            )}
          </button>

          {/* Primary CTA Call Button */}
          {activeNumbers.length > 0 && (
            <a
              href={`tel:${cleanNumber(activeNumbers[0])}`}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-extrabold rounded-xl sm:rounded-full transition active:scale-95 shadow-md shadow-blue-500/10 cursor-pointer"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
          )}
        </div>
      </div>

      {/* ================= PREMIUM AUTHENTICATION PROMPT MODAL ================= */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setShowAuthModal(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
          />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 shadow-2xl z-10 flex flex-col gap-5 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="h-6 w-6" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-lg font-black">Authentication Required</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                You must login or register a Kaamao account to {authModalReason}.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={`/login?redirect=${encodeURIComponent(window.location.pathname)}`}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-2xl transition shadow-md shadow-blue-500/10 cursor-pointer"
              >
                Log In
              </a>
              <a
                href={`/register?redirect=${encodeURIComponent(window.location.pathname)}`}
                className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-extrabold rounded-2xl transition cursor-pointer"
              >
                Create Free Account
              </a>
            </div>

            <button
              onClick={() => setShowAuthModal(false)}
              className="text-slate-400 dark:text-slate-500 hover:text-slate-650 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
