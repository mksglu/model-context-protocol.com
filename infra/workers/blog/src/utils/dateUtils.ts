export function getTurkeyDate(): { date: Date; isoString: string } {
	const now = new Date();
	const turkeyOffset = 3 * 60;
	const utcOffset = now.getTimezoneOffset();
	const totalOffset = turkeyOffset + utcOffset;

	now.setMinutes(now.getMinutes() + totalOffset);

	return {
		date: now,
		isoString: now.toISOString(),
	};
}
