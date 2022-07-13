import {
  calculateTimeDifferenceInMilliSeconds,
  convertMilliSecondsTohours,
} from './dateTimeUtils';

describe('Convert Milliseconds to Hours', () => {
  it('Converting Milliseconds to Hours works', () => {
    expect(convertMilliSecondsTohours(3600000)).toBe(1);
    expect(convertMilliSecondsTohours(-3600000)).toBe(-1);
    expect(convertMilliSecondsTohours(0)).toBe(0);
  });
});

describe('Calculate time difference in milliseconds', () => {
  it('Calculating difference in MilliSeconds with same Dates returns 0', () => {
    const date1 = new Date('2021-04-05T10:04:00Z');
    const date2 = new Date('2021-04-05T10:04:00Z');
    expect(calculateTimeDifferenceInMilliSeconds(date1, date2)).toBe(0);
  });

  it('Calculating difference in MilliSeconds works', () => {
    const date1 = new Date('2021-04-05T10:04:00Z');
    const date2 = new Date('2021-04-05T11:04:00Z');
    expect(calculateTimeDifferenceInMilliSeconds(date1, date2)).toBe(3600000);
    expect(calculateTimeDifferenceInMilliSeconds(date2, date1)).toBe(3600000);
  });
});
