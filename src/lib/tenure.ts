export function tenurePercent(months: number, totalYears: number): number {
  return Math.round((months / (totalYears * 12)) * 100);
}

export function tenureLabel(months: number): string {
  if (months >= 12) return `${(months / 12).toFixed(1)} yrs`;
  return `${months} mos`;
}
