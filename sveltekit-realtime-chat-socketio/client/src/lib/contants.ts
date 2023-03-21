import type { SiteInfo } from './types';
export const siteInfo : SiteInfo = {
	name: 'SvelteChat',
	github: 'https://github.com/lexxyungcarter/online-workbench-and-blog-content'
}

export const SOCKET_EVENTS = {
	connect: "connect",
	disconnect: "disconnect",
	onlineUsers: "users:online",
	message: "message",
	newMessage: "new-message",
};
