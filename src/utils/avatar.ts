/**
 * Extracts initials from a name
 * @param name - The full name to extract initials from
 * @returns The initials (up to 2 characters)
 */
export const getInitials = (name?: string | null): string => {
  if (!name || name.trim() === '') return 'AN';

  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

/**
 * Generates a consistent random color based on a string
 * @param str - The string to generate color from
 * @returns A hex color string
 */
export const getAvatarColor = (str: string = 'anonymous'): string => {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E9',
    '#F8C471',
    '#82E0AA',
  ];

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
