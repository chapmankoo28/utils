// SPDX-License-Identifier: CC-BY-SA-4.0
// Based on Source - https://stackoverflow.com/a/14919494
// Posted by mpen, modified by community. See post 'Timeline' for change history
// Retrieved 2026-10-19, License - CC BY-SA 4.0

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param decimalPlaces Number of decimal places to display.
 * @param si True to use metric (SI) units, aka powers of 1000.
 *           False to use binary (IEC), aka powers of 1024.
 *
 * @return Formatted string.
 *
 * @example
 * formatBytes(1551859712); // "1.4 GB"
 */
export function formatBytes(
	bytes: number,
	decimalPlaces = 1,
	si = false,
): string {
	const thresh = si ? 1000 : 1024;

	if (Math.abs(bytes) < thresh) {
		return bytes + " B";
	}

	const units = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	let u = -1;
	const r = 10 ** decimalPlaces;

	do {
		bytes /= thresh;
		++u;
	} while (
		Math.round(Math.abs(bytes) * r) / r >= thresh &&
		u < units.length - 1
	);

	return bytes.toFixed(decimalPlaces) + " " + units[u];
}
