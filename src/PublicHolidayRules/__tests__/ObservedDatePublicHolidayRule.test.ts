import { describe, it, expect } from '@jest/globals';
import { ObservedDatePublicHolidayRule } from '../ObservedDatePublicHolidayRule';
import { Month } from '../../enums';

describe('ObservedDatePublicHolidayRule', () => {
  it('observes holiday on Monday when it falls on a Sunday', () => {
    // January 1st falls on a Sunday in 2023
    const rule = new ObservedDatePublicHolidayRule(Month.January, 1);
    const newYearsDayObserved = new Date(2023, Month.January, 2);
    expect(rule.isPublicHoliday(newYearsDayObserved)).toBeTruthy();
  });

  it('observes holiday on Monday when it falls on a Saturday', () => {
    // January 1st falls on a Saturday in 2022
    const rule = new ObservedDatePublicHolidayRule(Month.January, 1);
    const newYearsDayObserved = new Date(2022, Month.January, 3);
    expect(rule.isPublicHoliday(newYearsDayObserved)).toBeTruthy();
  });

  it('does not observe holiday on the original date when it falls on a weekday', () => {
    // January 1st falls on a Friday in 2021
    const rule = new ObservedDatePublicHolidayRule(Month.January, 1);
    const newYearsDay = new Date(2021, Month.January, 1);
    expect(rule.isPublicHoliday(newYearsDay)).toBeTruthy();
  });

  it('does not observe holiday on the wrong date', () => {
    // January 1st falls on a Sunday in 2023
    const rule = new ObservedDatePublicHolidayRule(Month.January, 1);
    const wrongObservedDay = new Date(2023, Month.January, 3);
    expect(rule.isPublicHoliday(wrongObservedDay)).toBeFalsy();
  });
});
