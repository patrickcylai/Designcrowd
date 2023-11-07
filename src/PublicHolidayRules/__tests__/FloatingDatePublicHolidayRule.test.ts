import { describe, it, expect } from '@jest/globals';
import { FloatingDatePublicHolidayRule } from '../FloatingDatePublicHolidayRule';
import { DayOfWeek, Month, Occurrence } from '../../enums';

describe('FloatingDatePublicHolidayRule', () => {
  it('should correctly identify Australia Day', () => {
    const australiaDay = new Date(2023, Month.January, 26);
    const rule = new FloatingDatePublicHolidayRule(
      Month.January,
      Occurrence.Last,
      DayOfWeek.Thursday
    );
    expect(rule.isPublicHoliday(australiaDay)).toBeTruthy();
  });

  it('should correctly identify Kings Birthday', () => {
    const kingsBirthday = new Date(2023, Month.June, 12);
    const rule = new FloatingDatePublicHolidayRule(
      Month.June,
      Occurrence.Second,
      DayOfWeek.Monday
    );
    expect(rule.isPublicHoliday(kingsBirthday)).toBeTruthy();
  });

  it('should not identify incorrect dates as the public holiday', () => {
    const rule = new FloatingDatePublicHolidayRule(
      Month.January,
      Occurrence.First,
      DayOfWeek.Thursday
    );
    const notAustraliaDay = new Date(2023, Month.November, 16);

    expect(rule.isPublicHoliday(notAustraliaDay)).toBeFalsy();
  });
});
