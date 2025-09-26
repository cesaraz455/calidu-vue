/**
 * Formats a number to a more readable string representation
 * @param num - The number to format
 * @returns Formatted string (e.g., 1500 -> "1.5K", 2000000 -> "2.0M")
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
