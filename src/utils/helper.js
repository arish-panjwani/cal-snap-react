/** @format */

/** @format */

export function capitalizeFirstChar(str) {
  if (!str || typeof str !== "string") {
    return ""; // Handle empty or non-string input
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const debuggingMode = true;

export function formatDate(dateString) {
  // Parse the input date string into a Date object
  const date = new Date(dateString);

  // Check for invalid date
  if (isNaN(date)) {
    throw new Error("Invalid date string");
  }

  // Format the date using Intl.DateTimeFormat
  const options = { month: "short", day: "numeric", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
