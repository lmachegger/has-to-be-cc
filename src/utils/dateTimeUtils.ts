export function convertMilliSecondsTohours(milliSeconds: number): number {
  return milliSeconds / (1_000 * 60 * 60);
}

export function calculateTimeDifferenceInMilliSeconds(
  date1: Date,
  date2: Date,
): number {
  return Math.abs(date1.getTime() - date2.getTime());
}
