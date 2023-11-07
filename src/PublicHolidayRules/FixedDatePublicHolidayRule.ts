import { PublicHolidayRule } from './PublicHolidayRule';
import { Month } from '../enums';
import { isSameDay } from '../utils/utils';

/**
 * Rule for a public holiday that occurs on a fixed calendar date every year.
 */
export class FixedPublicHolidayRule extends PublicHolidayRule {
  /**
   * Creates a new fixed public holiday rule.
   * @param {Month} month - The month when the holiday occurs (zero-indexed, where January is 0).
   * @param {number} day - The day of the month when the holiday occurs.
   */
  constructor(private month: Month, private day: number) {
    super();
  }

  isPublicHoliday(date: Date): boolean {
    const year = date.getFullYear();
    const holiday = new Date(year, this.month, this.day);
    return isSameDay(date, holiday);
  }
}
