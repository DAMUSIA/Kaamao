"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, Suspense } from "react";
import PostHogPageView from "./PostHogPageView";

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Get the API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

    // Check if the API key exists before initializing
    if (!apiKey) {
      console.warn(
        "PostHog: Missing NEXT_PUBLIC_POSTHOG_KEY environment variable. " +
          "Analytics will be disabled. Please add your PostHog API key to .env.local",
      );
      return;
    }

    const consent = localStorage.getItem("cookie-consent");

    // Initialize PostHog with the API key
    posthog.init(apiKey, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      capture_pageview: false,
      capture_pageleave: true,
      opt_out_capturing_by_default: true, // Opt-out by default
    });

    // Apply initial consent status
    if (consent === "accepted") {
      posthog.opt_in_capturing();
    } else {
      posthog.opt_out_capturing();
    }

    // Listen to dynamically updated consent changes
    const handleConsentChange = () => {
      const updatedConsent = localStorage.getItem("cookie-consent");
      if (updatedConsent === "accepted") {
        posthog.opt_in_capturing();
      } else {
        posthog.opt_out_capturing();
      }
    };

    window.addEventListener("cookie-consent-changed", handleConsentChange);
    return () => {
      window.removeEventListener("cookie-consent-changed", handleConsentChange);
    };
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
