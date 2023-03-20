import type { User } from '$lib/types';
import { writable } from 'svelte/store';

export const authUser = writable<null|undefined|User>(null);
