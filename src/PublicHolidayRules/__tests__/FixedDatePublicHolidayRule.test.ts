import { describe, it, expect } from '@jest/globals';
import { FixedPublicHolidayRule } from '../FixedDatePublicHolidayRule';
import { Month } from '../../enums';

describe('FixedPublicHolidayRule', () => {
  it("correctly identifies New Year's Day", () => {
    const newYearsDay = new Date(2023, Month.January, 1);
    const rule = new FixedPublicHolidayRule(Month.January, 1);
    expect(rule.isPublicHoliday(newYearsDay)).toBeTruthy();
  });

  it('correctly identifies Christmas Day', () => {
    const christmasDay = new Date(2023, Month.December, 25);
    const rule = new FixedPublicHolidayRule(Month.December, 25);
    expect(rule.isPublicHoliday(christmasDay)).toBeTruthy();
  });

  it('does not identify the day after Christmas as Christmas Day', () => {
    const dayAfterChristmas = new Date(2023, Month.December, 26);
    const rule = new FixedPublicHolidayRule(Month.December, 25);
    expect(rule.isPublicHoliday(dayAfterChristmas)).toBeFalsy();
  });
});
