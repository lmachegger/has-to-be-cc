export function convertWhToKwh(wh: number): number {
  return wh / 1_000;
}

export function roundToPrecision(value: number, precision: number): number {
  const multiplier = 10 ** precision;
  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
}

export function sumArray(arr: number[]): number {
  return arr.reduce((accumulator, current) => accumulator + current);
}
