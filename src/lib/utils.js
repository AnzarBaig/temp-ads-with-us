import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function ny(...inputs) {
  return twMerge(clsx(inputs))
}
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
