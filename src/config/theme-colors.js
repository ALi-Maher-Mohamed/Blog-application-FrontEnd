/**
 * Theme Colors Configuration
 * ============================
 * Customize all colors in one place!
 * Change these values to update your entire app's color scheme
 * Supports both Light and Dark themes
 */

export const themeColors = {
  light: {
    // Background & Surface
    bgColor: "#f7f9fa",
    surfaceColor: "#ffffff",

    // Primary Colors
    primaryColor: "#1a8cd8", // Main brand color (Twitter-like blue)
    primaryHover: "#167bc0",
    primaryLight: "#e7f5fb",
    primaryDark: "#0d5a93",

    // Text Colors
    textMain: "#0f1419",
    textSecondary: "#536471",
    textTertiary: "#75828d",

    // Accent Colors
    redColor: "#f91880", // Hearts/Likes
    greenColor: "#00ba7c", // Success
    warnColor: "#ffd400", // Warnings
    orangeColor: "#ff6b6b", // Additional accent

    // Borders & Dividers
    borderColor: "#eff3f4",
    borderLight: "#f7f9fa",

    // Special
    overlayColor: "rgba(0, 0, 0, 0.5)",
    skeletonColor: "#e8edf2",
  },

  dark: {
    // Background & Surface
    bgColor: "#000000",
    surfaceColor: "#16181c",

    // Primary Colors
    primaryColor: "#1d9bf0", // Bright blue for dark mode
    primaryHover: "#1a8cd8",
    primaryLight: "#192e42",
    primaryDark: "#1da1f2",

    // Text Colors
    textMain: "#e7e9ea",
    textSecondary: "#71767b",
    textTertiary: "#54575a",

    // Accent Colors
    redColor: "#f91880", // Hearts/Likes (same for both)
    greenColor: "#00ba7c", // Success
    warnColor: "#ffd400", // Warnings
    orangeColor: "#ff6b6b", // Additional accent

    // Borders & Dividers
    borderColor: "#2f3336",
    borderLight: "#181b1f",

    // Special
    overlayColor: "rgba(0, 0, 0, 0.8)",
    skeletonColor: "#2f3336",
  },

  // Shared animation timings (in seconds)
  animations: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },

  // Border radius values
  radius: {
    sm: "8px",
    md: "16px",
    lg: "24px",
    full: "9999px",
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    darkSm: "0 1px 2px rgba(255, 255, 255, 0.02)",
    darkMd: "0 4px 6px -1px rgba(255, 255, 255, 0.03)",
    darkLg: "0 10px 15px -3px rgba(255, 255, 255, 0.05)",
  },
};

/**
 * How to use:
 *
 * 1. In CSS Variables (index.css):
 *    --primary-color: #{themeColors.light.primaryColor}
 *
 * 2. In JavaScript:
 *    import { themeColors } from './config/theme-colors';
 *    const colors = themeColors.light;
 *    console.log(colors.primaryColor);
 *
 * 3. To change theme colors, just edit the values above
 *    All components using CSS variables will update automatically!
 */
