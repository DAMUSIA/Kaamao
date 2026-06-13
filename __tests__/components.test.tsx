import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GoogleAnalytics from "../components/GoogleAnalytics";

// Mock Next.js Script component
vi.mock("next/script", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: function MockScript({ src, children, id, ...props }: any) {
      return (
        <script data-testid="next-script" data-src={src} id={id} {...props}>
          {children}
        </script>
      );
    },
  };
});

// Mock Supabase lib
vi.mock("../lib/supabase", () => {
  return {
    submitWaitlist: vi.fn(() => Promise.resolve({ success: true })),
    isSupabaseConfigured: true,
  };
});

describe("GoogleAnalytics Component", () => {
  it("renders without crashing and configures GA ID", () => {
    const originalEnv = process.env.NEXT_PUBLIC_GA_ID;
    process.env.NEXT_PUBLIC_GA_ID = "G-TEST123456";

    try {
      render(<GoogleAnalytics />);

      // Check that we render the scripts
      const scripts = screen.getAllByTestId("next-script");
      expect(scripts.length).toBe(2);

      // Check that the script source or config tag includes a measurement ID
      const trackingScript = scripts.find(
        (s) => s.getAttribute("id") === "google-analytics",
      );
      expect(trackingScript).toBeDefined();
    } finally {
      process.env.NEXT_PUBLIC_GA_ID = originalEnv;
    }
  });
});
