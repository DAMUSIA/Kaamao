import React from "react";

export default function RootLoading() {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-100 dark:border-slate-800 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-pulse"></div>
        </div>
        <p className="text-sm font-extrabold text-slate-600 dark:text-slate-400 animate-pulse tracking-wide">
          Connecting to GullyGig...
        </p>
      </div>
    </div>
  );
}
