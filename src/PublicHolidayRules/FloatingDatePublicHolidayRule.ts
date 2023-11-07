import { PublicHolidayRule } from './PublicHolidayRule';
import { DayOfWeek, Month, Occurrence } from '../enums';
import { isSameDay } from '../utils/utils';

/**
 * Rule for a public holiday that occurs on a relative position within a month,
 * E.g. King's birthday is on the second monday of June every year
 */
export class FloatingDatePublicHolidayRule extends PublicHolidayRule {
  /**
   * Creates a new rule for a floating date public holiday.
   *
   * @param {Month} month - The month when the holiday occurs.
   * @param {Occurrence} occurrence - The occurrence within the month (e.g., first, second, last).
   * @param {DayOfWeek} dayOfWeek - The day of the week the holiday falls on.
   */
  constructor(
    private month: Month,
    private occurrence: Occurrence,
    private dayOfWeek: DayOfWeek
  ) {
    super();
  }

  isPublicHoliday(date: Date): boolean {
    const year = date.getFullYear();
    const holiday = this.calculateDateForYear(year);
    return isSameDay(date, holiday);
  }

  /**
   * Calculates the date of the holiday for a given year based on the rule.
   */
  private calculateDateForYear(year: number): Date {
    let date = new Date(year, this.month, 1);
    // Find the first occurrence of the dayOfWeek
    while (date.getDay() !== this.dayOfWeek) {
      date.setDate(date.getDate() + 1);
    }
    if (this.occurrence === Occurrence.Last) {
      // Find the last occurrence in the month
      const lastDate = new Date(date);
      while (lastDate.getMonth() === date.getMonth()) {
        date = new Date(lastDate);
        lastDate.setDate(lastDate.getDate() + 7);
      }
    } else {
      // Find the first, second, third, or fourth occurrence
      date.setDate(date.getDate() + (this.occurrence - 1) * 7);
    }
    return date;
  }
}
