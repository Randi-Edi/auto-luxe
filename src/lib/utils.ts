import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a price in LKR (Sri Lankan Rupees)
 * Handles large numbers (6-10 digits) with proper formatting
 * Automatically abbreviates numbers >= 10 million (e.g., "10M", "20.5M", "100M")
 * @param price - The price value in LKR
 * @param options - Formatting options
 * @returns Formatted price string (e.g., "LKR 1,250,000" or "LKR 73.5M")
 */
export function formatLKRPrice(
  price: number,
  options?: {
    abbreviate?: boolean; // If true, force abbreviation for any number >= 1M
    showCurrency?: boolean; // If true, include "LKR" prefix
    fullNumber?: boolean; // If true, always show full number even if >= 10M
  }
): string {
  const { abbreviate = false, showCurrency = true, fullNumber = false } = options || {};

  let formattedPrice: string;

  // Auto-abbreviate numbers >= 10 million by default (unless fullNumber is true)
  const shouldAbbreviate = abbreviate || (!fullNumber && price >= 10000000);

  if (shouldAbbreviate && price >= 1000000) {
    // Abbreviate millions (e.g., 10M, 20.5M, 73.5M, 100M, 200M)
    const millions = price / 1000000;
    formattedPrice = millions % 1 === 0 
      ? `${millions.toFixed(0)}M` 
      : `${millions.toFixed(1)}M`;
  } else if (abbreviate && price >= 1000) {
    // Only abbreviate thousands if explicitly requested
    const thousands = price / 1000;
    formattedPrice = thousands % 1 === 0 
      ? `${thousands.toFixed(0)}K` 
      : `${thousands.toFixed(1)}K`;
  } else {
    // Full number with commas for readability
    formattedPrice = price.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true, // Always use commas for thousands
    });
  }

  return showCurrency ? `LKR ${formattedPrice}` : formattedPrice;
}



