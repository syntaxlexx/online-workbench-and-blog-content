import { Express } from 'express';
import type { Server } from "socket.io";
import { cleanWords, generateMessage, generateUser } from './helpers';
import { SocketMessagePayload, User } from './types';

const EVENTS = {
	onlineUsers: "users:online",
	message: "message",
	newMessage: "new-message",
};

const users = new Map<string, User>();

module.exports = (app: Express) => {
	// @ts-ignore
	const io: Server = app.io;

	io.on('connection', socket => {
		const id = socket.id;
		console.log('A user connected: ', id);
		const user = users.get(id) ?? generateUser();
		users.set(id, user);
		io.emit(EVENTS.onlineUsers, users.size);

		socket.on('disconnect', () => {
			console.log('user disconnected: ', id);
			users.delete(id);

			io.emit(EVENTS.onlineUsers, users.size);
		});

		// get online users
		socket.on(EVENTS.onlineUsers, () => {
			io.emit(EVENTS.onlineUsers, users.size);
		});

		// handle incoming message
		socket.on(EVENTS.message, (message: SocketMessagePayload) => {
			console.log(`Received message ${message.message} from ${user.username}`);
			const mes = generateMessage({
				content: cleanWords(message.message),
				user: user
			});

			const payload: SocketMessagePayload = {
				message: mes.message,
				user: {
					name: user.username,
					color: user.rgbColor,
					badges: user.badges,
				},
				createdAt: new Date()
			}
			io.emit(EVENTS.newMessage, payload);
		});

	});
};
