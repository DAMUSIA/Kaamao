"use client";

import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card Skeleton */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4 sm:gap-6 w-full">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-2xl flex-shrink-0" />
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="h-6 bg-gray-200 rounded-md w-1/3" />
                    <div className="flex gap-2">
                      <div className="h-5 bg-gray-200 rounded-full w-24" />
                      <div className="h-5 bg-gray-200 rounded-full w-20" />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 w-3/4">
                      <div className="h-4 bg-gray-200 rounded-md w-16" />
                      <div className="h-4 bg-gray-200 rounded-md w-16" />
                      <div className="h-4 bg-gray-200 rounded-md w-32" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Me Skeleton */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 space-y-3">
              <div className="h-5 bg-gray-200 rounded-md w-24" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-md w-full" />
                <div className="h-4 bg-gray-200 rounded-md w-full" />
                <div className="h-4 bg-gray-200 rounded-md w-2/3" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Sidebar Cards Skeleton */}
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 space-y-4">
                <div className="h-5 bg-gray-200 rounded-md w-1/3" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-md w-full" />
                  <div className="h-4 bg-gray-200 rounded-md w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
