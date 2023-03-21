import type {Socket} from 'socket.io-client';
import { writable } from 'svelte/store';

export const ioSocket = writable<null|undefined|Socket>(null);
export const isIoSocketConnected = writable<boolean>(false);
export const connectedUsers = writable<number>(0);
