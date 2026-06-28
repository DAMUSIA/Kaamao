"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

export default function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    const trackPageView = () => {
      if (pathname && posthog) {
        const consent = localStorage.getItem("cookie-consent");
        if (consent === "accepted") {
          let url = window.origin + pathname;
          const search = searchParams.toString();
          if (search) url += `?${search}`;
          posthog.capture("$pageview", { $current_url: url });
        }
      }
    };

    trackPageView();

    window.addEventListener("cookie-consent-changed", trackPageView);
    return () => {
      window.removeEventListener("cookie-consent-changed", trackPageView);
    };
  }, [pathname, searchParams, posthog]);

  return null;
}
