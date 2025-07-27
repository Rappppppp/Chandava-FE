export const formatTitleCase = (str: string): string => {
  return str
    .replace(/-/g, " ") // Replace all hyphens with spaces
    .split(" ") // Split by spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "); // Rejoin into a string
};
