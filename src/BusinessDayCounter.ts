import { DayCounter } from './DayCounter';
import { PublicHolidayRule } from './PublicHolidayRules/PublicHolidayRule';
import { DayOfWeek } from './enums';
import { isSameDay } from './utils/utils';

/**
 * BusinessDayCounter class calculates the number of business days
 * between two dates (not including the first and second date),
 * accounting for weekends and public holidays based on provided rules.
 */
class BusinessDayCounter extends DayCounter {
  private publicHolidays: Date[] = [];
  private publicHolidayRules: PublicHolidayRule[] = [];

  /**
   * Calculates the number of weekdays between two dates, excluding weekends.
   *
   * @param {Date} firstDate - The start date of the period.
   * @param {Date} secondDate - The end date of the period.
   * @returns {number} The number of weekdays between the start and end dates.
   */
  public WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    return this.conditionalDaysBetweenDates(
      firstDate,
      secondDate,
      (date: Date) => !this.isWeekend(date)
    );
  }

  /**
   * Calculates the number of business days between two dates, taking into account weekends
   * and an optional list of public holidays and custom rules.
   *
   * @param {Date} firstDate - The start date of the period.
   * @param {Date} secondDate - The end date of the period.
   * @param {Date[]} [publicHolidays] - Optional array of fixed public holiday dates.
   * @param {PublicHolidayRule[]} [publicHolidayRules] - Optional array of rules for floating public holidays.
   * @returns {number} The number of business days between the start and end dates.
   */
  public BusinessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    publicHolidays?: Date[],
    publicHolidayRules?: PublicHolidayRule[]
  ): number {
    this.publicHolidays = publicHolidays || [];
    this.publicHolidayRules = publicHolidayRules || [];
    return this.conditionalDaysBetweenDates(
      firstDate,
      secondDate,
      (date: Date) => !this.isWeekend(date) && !this.isPublicHoliday(date)
    );
  }

  private conditionalDaysBetweenDates(
    firstDate: Date,
    secondDate: Date,
    condition: (date: Date) => boolean
  ): number {
    if (firstDate >= secondDate) {
      return 0;
    }

    let count = 0;
    let currentDate = new Date(firstDate);
    currentDate.setDate(currentDate.getDate() + 1);

    while (currentDate < secondDate) {
      if (condition(currentDate)) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
  }

  private isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === DayOfWeek.Sunday || day === DayOfWeek.Saturday;
  }

  private isPublicHoliday(date: Date): boolean {
    return (
      this.publicHolidays.some((holiday) => isSameDay(date, holiday)) ||
      this.publicHolidayRules.some((rule) => rule.isPublicHoliday(date))
    );
  }
}

export default BusinessDayCounter;
