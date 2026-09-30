import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, fractionDigits = 2): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(fractionDigits)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(fractionDigits)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(fractionDigits)}K`;
  }
  return `$${value.toFixed(fractionDigits)}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatPercent(value: number, fractionDigits = 2): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(fractionDigits)}%`;
}
