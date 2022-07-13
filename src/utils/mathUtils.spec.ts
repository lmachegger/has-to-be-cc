import { convertWhToKwh, roundToPrecision, sumArray } from './mathUtils';

describe('Convert Wh to kWh', () => {
  it('Convert Wh to kWh works', () => {
    expect(convertWhToKwh(1000)).toBe(1);
  });
});

describe('Round to Precision', () => {
  it('Round to precision works', () => {
    expect(roundToPrecision(0.005, 2)).toBe(0.01);
    expect(roundToPrecision(0.0049, 2)).toBe(0);
    expect(roundToPrecision(0.0000005, 6)).toBe(0.000001);
    expect(roundToPrecision(0.00000049, 6)).toBe(0);
  });
});

describe('Sum Array', () => {
  it('Calculating sum of array of numbers works', () => {
    expect(sumArray([1, 2, 3, 4, 5, 6])).toBe(21);
    expect(sumArray([1, -2, 3, -4, 5, -6])).toBe(-3);
  });
});
