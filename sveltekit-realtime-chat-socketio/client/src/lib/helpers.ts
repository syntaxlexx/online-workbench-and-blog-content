import { fail } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { createId } from '@paralleldrive/cuid2'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const randomUuid = () => {
	return createId();
};

export const customResponse = (status: number, success: boolean, message: string, data?: any) => {
	if (success) {
		return {
			success: success,
			message: message,
			info: data
		};
	}

	return fail(status, {
		success: success,
		message: message,
		info: data
	});
};

export const convertToJson = (data: object | Array<any>) => {
	return JSON.parse(JSON.stringify(data));
};

/**
 * generate a random string
 * @param length number
 * @returns string
 */
export const randomString = (length = 6) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

/**
 * return 24-hour time from an  ISO 8601  date
 * @param date string
 * @returns string
 */
export const getTimeFromDate = (date: string | Date) => {
	return dayjs(date).format('HH:mm');
};

/**
 * generate a random number
 * @param min number
 * @param max number
 * @returns number
 */
export const randomNumber = (min = 0, max = 10000) => {
	return Math.floor(Math.random() * max) + min;
};

/**
 * get default avatar link
 * @param name string
 * @returns string
 */
export function getDefaultAvatarLink(name = "AKA") {
	return `https://ui-avatars.com/api/?name=${name}`;
}

// date => 2 days ago
export const fromNow = (date: Date|null|undefined) => {
    if (!date) return "";
    return dayjs(date).fromNow(); // { addSuffix: true }
};

// date => 22nd Jun 2021, 2:00 pm
// https://day.js.org/docs/en/display/format
export const dateFormat = (date: Date|null|undefined, dateFormat = "MMM D, YYYY h:mm A") => {
    if (!date) return "";
    return dayjs(date).format(dateFormat);
};

/**
 * get birthday
 * @param date Date|null|undefined
 * @returns string
 */
export const birthdayFromNow = (date: Date|null|undefined) => {
    if (!date) return "";

    const birthday = new Date(date);
    const today = new Date();

    //Set current year or the next year if you already had birthday this year
    birthday.setFullYear(today.getFullYear());
    if (today > birthday) {
        birthday.setFullYear(today.getFullYear() + 1);
    }

    // Calculate difference between days
    return Math.floor((birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};
