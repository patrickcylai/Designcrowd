export abstract class PublicHolidayRule {
  /**
   * Determines if a given date matches the holiday
   *
   * @param {Date} date - The date to check against the holiday rule.
   * @returns {boolean} True if the provided date matches the holiday date; false otherwise.
   */
  abstract isPublicHoliday(date: Date): boolean;
}
