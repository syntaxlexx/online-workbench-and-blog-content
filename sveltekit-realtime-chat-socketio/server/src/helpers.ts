import { faker } from '@faker-js/faker';
import { Badge, Message, SocketMessagePayload, User } from './types';
import jwt from 'jsonwebtoken';
import { createId } from '@paralleldrive/cuid2'

const jwtSecret = process.env.JWT_SECRET as string;
const badWords = require('bad-words');
const dayjs = require('dayjs');

/**
 * Get user info from json web token
 * @param token string
 * @returns User|null
 */
export const getUserInformation = (token: string) : User|null => {
	try {
		const decoded = jwt.verify(token, jwtSecret);
		// @ts-ignore
		return decoded.user;
	} catch (err) {}
	return null;
};

export const randomUuid = () => {
	return createId();
};

export const generateMessageForSocket = (options?: {
	content?: string,
	user?: User
}) : SocketMessagePayload => {
	const mes = generateMessage(options)

	return {
		message: mes.message,
		user: {
			name: mes.userName,
			color: mes.user.rgbColor,
			badges: mes.user.badges,
		},
		createdAt: new Date()
	}
}

export const generateMessage = (options?: {
	content?: string,
	user?: User
}): Message => {
	const us = options?.user ?? generateUser();

	return {
		_id: randomUuid(),
		user: us,
		userName: us.username,
		message: options?.content ?? generateRandomSentence()
	};
};

export const generateUser = (): User => {
	return {
		_id: randomUuid(),
		username: faker.internet.userName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		rgbColor: faker.internet.color(250, 250, 250),
		badges: generateRandomBadges(),
		role: 'user'
	};
};

const generateRandomBadges = (): Badge[] => {
	const badge = (badge: Badge, prob: number) => faker.helpers.maybe(() => badge, { probability: prob });

	return [
		badge('vip', 0.1),
		badge('moderator', 0.1),
		badge('prime', 0.2),
		badge('turbo', 0.1)
	].filter(x => x !== undefined) as Badge[];
};

const generateRandomSentence = () => {
	const sentences: string[] = [
		'Hello! 👋🏻',
		'🤣🤣🤣🤣',
		'lol',
		'So cool! 😎',
		'I love this chat! 😍',
		'Please don\'t write bad words!',
		'Subscribe to Gionatha\'s channel!',
		'Don\'t forget to like and subscribe!',
		'Is anybody here ?',
		'Byeeee'
	];

	return faker.helpers.arrayElement(sentences);
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
 * check if a string contains abusive words
 *
 * @param str string
 * @returns bool
 */
export const restrictedWords = [
	'idiot',
	'banned',
	'banned2',
];

/**
 * check if has bad word
 * @param str word
 * @returns bool
 */
export const hasBadWords = (str: string) => {
	const filter = new badWords();

	filter.addWords(...restrictedWords);

	return filter.isProfane(str);
};

/**
 * clean a string of words
 * @param str words
 * @returns string
 */
export const cleanWords = (str: string) => {
	const filter = new badWords();

	filter.addWords(...restrictedWords);

	return filter.clean(str);
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
 * get default avatar link
 * @param name string
 * @returns string
 */
export function getDefaultAvatarLink(name = 'AKA') {
	return `https://ui-avatars.com/api/?name=${name}`;
}


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
