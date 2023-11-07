import { PublicHolidayRule } from './PublicHolidayRule';
import { DayOfWeek } from '../enums';
import { isSameDay } from '../utils/utils';

/**
 * Rule for a observed public holiday that if falls on a weekend is observed on the next weekday (in this case Monday).
 * E.g. if the holiday falls on a Saturday or Sunday, it is observed on the following Monday,
 */
export class ObservedDatePublicHolidayRule extends PublicHolidayRule {
  /**
   * Constructs an observed holiday rule for a specific date.
   *
   * @param {number} month - The zero-based month index (0 for January) when the holiday occurs.
   * @param {number} day - The day of the month when the holiday occurs.
   */
  constructor(private month: number, private day: number) {
    super();
  }

  isPublicHoliday(date: Date): boolean {
    const year = date.getFullYear();
    let holiday = new Date(year, this.month, this.day);

    if (holiday.getDay() === DayOfWeek.Saturday) {
      holiday.setDate(holiday.getDate() + 2);
    } else if (holiday.getDay() === DayOfWeek.Sunday) {
      holiday.setDate(holiday.getDate() + 1);
    }
    return isSameDay(date, holiday);
  }
}
