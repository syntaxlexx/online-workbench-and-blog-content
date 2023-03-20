import ioClient, { Socket } from 'socket.io-client';
import { PUBLIC_WS_DOMAIN } from '$env/static/public';

const socket = ioClient(PUBLIC_WS_DOMAIN, {
	withCredentials: true
});

export type ioSocket = Socket;

export const io = socket;

export const EVENTS = {
	onlineUsers: "users:online",
	message: "message",
	newMessage: "new-message",
};
