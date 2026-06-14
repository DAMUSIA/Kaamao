"use client";

import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { UserProfile } from "@/lib/supabase";

interface ProfileDetailsProps {
  profile: UserProfile;
  isEditing: boolean;
  formData: {
    about: string;
  };
  onInputChange: (name: string, value: string) => void;
}

export default function ProfileDetails({
  profile,
  isEditing,
  formData,
  onInputChange,
}: ProfileDetailsProps) {
  // Calculate age from DOB dynamically
  const calculateAge = (dobString?: string | null) => {
    if (!dobString) return null;
    try {
      const birthDate = new Date(dobString);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return `${age} years old`;
    } catch {
      return null;
    }
  };

  const ageText = calculateAge(profile.dob);

  return (
    <div className="space-y-6">
      {/* About Me Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
      >
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          About Me
        </h3>
        
        {isEditing ? (
          <div className="space-y-1">
            <textarea
              value={formData.about}
              onChange={(e) => onInputChange("about", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-gray-900 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
        ) : (
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-words whitespace-pre-wrap">
            {profile.dob && ageText && (
              <span className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                Age: {ageText}
              </span>
            )}
            {profile.location ? `Based in ${profile.location}. ` : ""}
            {profile.dob || profile.location ? "\n\n" : ""}
            {profile.about || "No details provided yet. Add information about yourself by clicking Edit Profile above."}
          </p>
        )}
      </motion.div>
    </div>
  );
}
