# DesignCrowd Challenge
## Description

### BusinessDayCounter
A class `BusinessDayCounter` that has two functions: `WeekdaysBetweenTwoDates` and `BusinessDaysBetweenTwoDates`.

`WeekdaysBetweenTwoDates` allows the consumer to calculate the number of weekdays between two dates.

`BusinessDaysBetweenTwoDates` allows the consumer to calculate the number of business days between two dates excluding public holidays and weekends. Can supply a list of public holidays or a list of rules for public holidays.

### PublicHolidayRules
3 Rules available that are separated into their own classes:
* FixedDatePublicHolidayRule
  * For fixed date only public holidays, this will not shift to an observed date.
* FloatingDatePublicHolidayRule
  * For public holiday dates that are based on an occurrence schedule such as King's birthday which is on the second Monday of June every year.
* ObservedDatePublicHolidayRule
  * For public holidays that will shift to an observed day typically a Monday if it happens to land on a weekend.

## Process
1. Understanding the requirements of the spec
2. With TDD methodology, developed test cases and also encapsulating the test cases given in the challenge. I used `jest` as the testing framework of choice.
   1. These unit test cases are run as I make changes to check for regressions.
   2. `yarn test --watch` comes in handy.
3. Implemented the challenge instructions from Task 1 to Task 3.
4. Maintainability and readability being key to the solution, exported `enums` were created to allow others to easily follow the code and reducing the chance of errors when consumers use it.
5. In this particular challenge, packages are kept to a minimum and necessary scripts were added for compiling and debugging.
