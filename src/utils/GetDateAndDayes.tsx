export const formatMonthYear = (dateStr?: string) => {
  if (!dateStr) return "Not Available";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-EG", {
    year: "numeric",
    month: "long",
  }).format(date);
};

export const formatFullDate = (dateStr?: string) => {
  if (!dateStr) return "Not Available";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatTime = (dateStr?: string) => {
  if (!dateStr) return "Not Available";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-EG", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};
