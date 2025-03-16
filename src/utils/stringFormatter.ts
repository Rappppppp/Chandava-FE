export const formatTitleCase = (str: string): string => {
    return str
      .split(" ") // Split by spaces
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
      .join(" "); // Rejoin into a string
  };
  