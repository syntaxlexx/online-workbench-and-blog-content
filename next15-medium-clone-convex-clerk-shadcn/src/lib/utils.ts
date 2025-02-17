import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export function formatDate(date: number) {
  const formatter = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return formatter.format(date);
}

export function combineName(
  user: { firstName?: string | null; lastName?: string | null } | null
): string {
  if (!user) return "Anonymous";
  return `${user.firstName} ${user.lastName}`;
}
