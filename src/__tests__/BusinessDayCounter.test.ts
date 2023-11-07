import { describe, expect, it } from '@jest/globals';
import BusinessDayCounter from '../BusinessDayCounter';
import { DayOfWeek, Month, Occurrence } from '../enums';
import { PublicHolidayRule } from '../PublicHolidayRules/PublicHolidayRule';
import { FloatingDatePublicHolidayRule } from '../PublicHolidayRules/FloatingDatePublicHolidayRule';
import { ObservedDatePublicHolidayRule } from '../PublicHolidayRules/ObservedDatePublicHolidayRule';
import { FixedPublicHolidayRule } from '../PublicHolidayRules/FixedDatePublicHolidayRule';

describe('BusinessDayCounter', () => {
  const businessDayCounter = new BusinessDayCounter();

  describe('WeekdaysBetweenTwoDates', () => {
    const testCases = [
      {
        firstDate: new Date(2013, Month.October, 7),
        secondDate: new Date(2013, Month.October, 9),
        expected: 1,
      },
      {
        firstDate: new Date(2013, Month.December, 24),
        secondDate: new Date(2013, Month.December, 27),
        expected: 2,
      },
      {
        firstDate: new Date(2013, Month.October, 7),
        secondDate: new Date(2014, Month.January, 1),
        expected: 61,
      },
    ];
    it.each(testCases)(
      `should return expected number of weekdays for firstDate $firstDate.get and secondDate $secondDate`,
      ({ firstDate, secondDate, expected }) => {
        expect(
          businessDayCounter.WeekdaysBetweenTwoDates(firstDate, secondDate)
        ).toBe(expected);
      }
    );

    it('should return 0 when first date is after second date', () => {
      const firstDate = new Date(2023, 10, 9);
      const secondDate = new Date(2023, 10, 7);

      expect(
        businessDayCounter.WeekdaysBetweenTwoDates(firstDate, secondDate)
      ).toBe(0);
    });

    it('should return 0 when first date is equal to second date', () => {
      const firstDate = new Date(2023, 10, 9);
      const secondDate = new Date(2023, 10, 9);

      expect(
        businessDayCounter.WeekdaysBetweenTwoDates(firstDate, secondDate)
      ).toBe(0);
    });
  });

  describe('BusinessDaysBetweenTwoDates', () => {
    const testCasesForPublicHolidaysList = [
      {
        firstDate: new Date(2013, Month.October, 7),
        secondDate: new Date(2013, Month.October, 9),
        expected: 1,
      },
      {
        firstDate: new Date(2013, Month.December, 24),
        secondDate: new Date(2013, Month.December, 27),
        expected: 0,
      },
      {
        firstDate: new Date(2013, Month.October, 7),
        secondDate: new Date(2014, Month.January, 1),
        expected: 59,
      },
    ];

    const publicHolidays = [
      new Date(2013, Month.December, 25),
      new Date(2013, Month.December, 26),
      new Date(2014, Month.January, 1),
    ];

    const testCasesForPublicHolidayRules = [
      {
        firstDate: new Date(2013, Month.October, 7),
        secondDate: new Date(2013, Month.October, 9),
        expected: 1,
      },
      {
        firstDate: new Date(2013, Month.December, 24),
        secondDate: new Date(2014, Month.January, 2),
        expected: 2,
      },
      {
        firstDate: new Date(2013, Month.October, 7),
        secondDate: new Date(2014, Month.January, 1),
        expected: 58,
      },
    ];

    const publicHolidayRules: PublicHolidayRule[] = [
      new ObservedDatePublicHolidayRule(Month.December, 25),
      new ObservedDatePublicHolidayRule(Month.December, 26),
      new FixedPublicHolidayRule(Month.December, 31),
      new ObservedDatePublicHolidayRule(Month.January, 1),
      new FloatingDatePublicHolidayRule(
        Month.June,
        Occurrence.Second,
        DayOfWeek.Monday
      ),
      new FixedPublicHolidayRule(Month.April, 25),
    ];

    it.each(testCasesForPublicHolidaysList)(
      'should return expected number of business days with list of public holidays',
      ({ firstDate, secondDate, expected }) => {
        expect(
          businessDayCounter.BusinessDaysBetweenTwoDates(
            firstDate,
            secondDate,
            publicHolidays
          )
        ).toBe(expected);
      }
    );

    it.each(testCasesForPublicHolidayRules)(
      'should return expected number of business days for public holiday rules',
      ({ firstDate, secondDate, expected }) => {
        expect(
          businessDayCounter.BusinessDaysBetweenTwoDates(
            firstDate,
            secondDate,
            undefined,
            publicHolidayRules
          )
        ).toBe(expected);
      }
    );

    it('should return 0 when first date is after second date', () => {
      const firstDate = new Date(2023, Month.November, 9);
      const secondDate = new Date(2023, Month.November, 7);

      expect(
        businessDayCounter.BusinessDaysBetweenTwoDates(
          firstDate,
          secondDate,
          undefined,
          publicHolidayRules
        )
      ).toBe(0);
    });

    it('should return 0 when first date is equal to second date', () => {
      const firstDate = new Date(2023, Month.November, 9);
      const secondDate = new Date(2023, Month.November, 9);

      expect(
        businessDayCounter.BusinessDaysBetweenTwoDates(
          firstDate,
          secondDate,
          undefined,
          publicHolidayRules
        )
      ).toBe(0);
    });

    it('should only count weekdays when no public holidays are provided', () => {
      const firstDate = new Date(2023, Month.November, 9);
      const secondDate = new Date(2023, Month.November, 15);

      expect(
        businessDayCounter.BusinessDaysBetweenTwoDates(firstDate, secondDate)
      ).toBe(3);
    });
  });
});
