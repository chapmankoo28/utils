type DateTimeParts = {
	year: string;
	month: string;
	day: string;
	dayPeriod: string;
	hour: string;
	minute: string;
	second: string;
	timeZone: string;
};

/**
 * Splits a date into zh-HK parts in UTC+8.
 *
 * @param date Date to split.
 * @returns Parts keyed by `Intl.DateTimeFormatPart` type.
 */
function formatDateToParts(date: Date, hour12 = false): DateTimeParts {
	const formatter = new Intl.DateTimeFormat("zh-HK", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		dayPeriod: "short",
		hourCycle: hour12 ? "h12" : "h23",
		hour: "numeric",
		minute: "2-digit",
		second: "2-digit",
		timeZone: "+08:00",
	});
	return Object.fromEntries(
		formatter.formatToParts(date).map(({ type, value }) => [type, value]),
	) as DateTimeParts;
}

/**
 * Formats the date as `YYYY-MM-DD`.
 *
 * @param date Date to format.
 *
 * @example
 * formatDate(new Date("2026-10-19T15:04:05+08:00")); // "2026-10-19"
 */
export function formatDate(date: Date) {
	const { year, month, day } = formatDateToParts(date);
	return `${year}-${month}-${day}`;
}

/**
 * Formats the time.
 *
 * @param date Date to format.
 * @param hour12 Use a 12-hour clock with the day period. Defaults to false.
 *
 * @example
 * formatTime(new Date("2026-10-19T15:04:05+08:00"));       // "15:04"
 * formatTime(new Date("2026-10-19T15:04:05+08:00"), true); // "下午 3:04"
 */
export function formatTime(date: Date, hour12 = false) {
	const { hour, minute, dayPeriod } = formatDateToParts(date, hour12);
	if (hour12) {
		return `${dayPeriod} ${hour}:${minute}`;
	} else {
		return `${hour}:${minute}`;
	}
}
