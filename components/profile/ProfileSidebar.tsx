"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Shield, User } from "lucide-react";
import { UserProfile } from "@/lib/supabase";

interface VerificationItem {
  label: string;
  verified: boolean;
}

interface ProfileSidebarProps {
  profile: UserProfile;
  isEditing: boolean;
  formData: {
    gender: string;
    dob: string;
  };
  onInputChange: (name: string, value: string) => void;
}

export default function ProfileSidebar({
  profile,
  isEditing,
  formData,
  onInputChange,
}: ProfileSidebarProps) {
  // Verification state (Phone is verified if user has phone_no, Email is verified if user has email)
  const verification: VerificationItem[] = [
    { label: "Phone Verified", verified: !!profile.phone_no },
    { label: "Email Verified", verified: !!profile.email && !profile.email.endsWith("@kaamao.com") },
    { label: "ID Verification", verified: false },
    { label: "Background Check", verified: false },
  ];

  const startVerification = (item: VerificationItem) => {
    alert(`Starting ${item.label} verification process...`);
  };

  return (
    <div className="space-y-6">
      {/* Personal Details Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
      >
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Personal Details
        </h3>
        
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => onInputChange("gender", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold text-gray-900 bg-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => onInputChange("dob", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold text-gray-900"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs sm:text-sm text-gray-700">
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500 font-semibold uppercase tracking-wider text-[11px]">Gender</span>
              <span className="font-bold text-gray-900">{profile.gender || "Not specified"}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-gray-500 font-semibold uppercase tracking-wider text-[11px]">Birth Date</span>
              <span className="font-bold text-gray-900">
                {profile.dob ? new Date(profile.dob).toLocaleDateString(undefined, { dateStyle: "medium" }) : "Not specified"}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Verification Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
      >
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Verification Status
        </h3>
        <div className="space-y-3">
          {verification.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-xs sm:text-sm"
            >
              <span className="text-gray-600 font-medium">{item.label}</span>
              {item.verified ? (
                <span className="text-green-600 flex items-center gap-1 font-semibold whitespace-nowrap">
                  <CheckCircle className="w-4 h-4" /> Verified
                </span>
              ) : (
                <button
                  onClick={() => startVerification(item)}
                  className="text-orange-500 flex items-center gap-1 hover:text-orange-600 transition font-semibold whitespace-nowrap cursor-pointer border-0 bg-transparent"
                >
                  <XCircle className="w-4 h-4" /> Verify
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
