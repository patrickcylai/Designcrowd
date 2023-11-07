import { PublicHolidayRule } from './PublicHolidayRules/PublicHolidayRule';

export abstract class DayCounter {
  /**
   * Counts the number of weekdays between two given dates.
   *
   * @param {Date} firstDate - Start date.
   * @param {Date} secondDate - End date.
   * @returns {number} The number of weekdays between the two dates.
   */
  abstract WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number;

  /**
   * Counts the number of business days between two dates, taking into account
   * a list of public holidays or rules for public holidays.
   *
   * @param {Date} firstDate - Start date.
   * @param {Date} secondDate - End date.
   * @param {Date[]} publicHolidays - An array of dates representing public holidays.
   * @param {PublicHolidayRule[]} publicHolidayRules - An array of rules for public holidays.
   * @returns {number} The number of business days between the two dates.
   */
  abstract BusinessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: Date[],
    publicHolidayRules: PublicHolidayRule[]
  ): number;
}
