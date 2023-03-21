import ioClient from 'socket.io-client';
import { PUBLIC_WS_DOMAIN } from '$env/static/public';

const socket = ioClient(PUBLIC_WS_DOMAIN, {
	withCredentials: true,
	autoConnect: true,
});

export default socket;