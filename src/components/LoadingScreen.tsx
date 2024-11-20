import React from "react";
import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Main container with glass effect */}
      <div className="relative p-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/20 dark:border-gray-700/20">
        {/* Spinning outer ring */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 animate-[spin_3s_linear_infinite] opacity-20 dark:opacity-30" />

        {/* Content container */}
        <div className="relative space-y-6 text-center px-8 py-6">
          {/* Main loader icon */}
          <div className="flex justify-center">
            <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin" />
          </div>

          {/* Animated dots */}
          <div className="flex items-center justify-center space-x-2">
            {[0, 1, 2].map(index => (
              <div
                key={index}
                className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400 animate-[bounce_1s_infinite]"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  opacity: 0.7,
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-64 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 animate-progressBar" />
          </div>

          {/* Loading text */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 animate-pulse">
              Loading your dashboard
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please wait while we prepare your experience
            </p>
          </div>

          {/* Loading steps */}
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            {[
              "Verifying credentials",
              "Loading user data",
              "Preparing dashboard",
            ].map((step, index) => (
              <div
                key={step}
                className="animate-fadeInOut"
                style={{
                  animationDelay: `${index * 2}s`,
                }}
              >
                {step}...
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-32 h-32 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>
    </div>
  );
};
