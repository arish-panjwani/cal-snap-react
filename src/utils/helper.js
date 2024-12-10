/** @format */

export function capitalizeFirstChar(str) {
  if (!str || typeof str !== "string") {
    return ""; // Handle empty or non-string input
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const debuggingMode = false;
