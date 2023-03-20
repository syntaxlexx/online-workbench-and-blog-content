import type {Socket} from 'socket.io-client';
import { writable } from 'svelte/store';

export const ioSocket = writable<null|undefined|Socket>(null);
