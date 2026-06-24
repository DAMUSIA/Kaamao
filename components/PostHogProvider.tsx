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

    // Initialize PostHog with the API key
    posthog.init(apiKey, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      capture_pageview: false,
      capture_pageleave: true,
    });
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
