import type { Handle } from '@sveltejs/kit';
import { getUserInformation } from '$lib/server/helpers';
import type { User } from './lib/types';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies } = event;
	const session = cookies.get('session');

	if (typeof session === ('undefined' || '') || !session) {
		return resolve(event);
	}

	const sessionData = getUserInformation(session);

	if (sessionData) {
		event.locals.user = sessionData as User;
	} else {
		cookies.delete('session');
	}

	return resolve(event);
};
