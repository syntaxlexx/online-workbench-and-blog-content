import mongoose from 'mongoose';
import { DB_URI, DB_NAME } from '$env/static/private';

const MONGO_URL = `${DB_URI}/${DB_NAME}`;

/* 
  0 - disconnected
  1 - connected
  2 - connecting
  3 - disconnecting
  4 - uninitialized
*/
const mongoConnection = {
	isConnected: 0
};

mongoose.set('strictQuery', false);

export const dbConnect = async () => {
	console.log('MONGO_URL', MONGO_URL);
	if (mongoConnection.isConnected === 1) {
		// console.log('connection established');
		return;
	}

	if (mongoose.connections.length > 0) {
		mongoConnection.isConnected = mongoose.connections[0].readyState;
		if (mongoConnection.isConnected === 1) {
			// console.log('already connected');
			return;
		}

		await mongoose.disconnect();
	}
	await mongoose.connect(MONGO_URL ?? '');
	mongoConnection.isConnected = 1;
	console.log('connected to mongodb', MONGO_URL ?? '');
};

export const dbDisconnect = async () => {
	if (process.env.NODE_ENV === 'development') return;
	if (process.env.NODE_ENV === 'dev') return;
	if (process.env.NODE_ENV === 'local') return;
	if (mongoConnection.isConnected === 0) return;

	await mongoose.disconnect();
	mongoConnection.isConnected = 0;
	// console.log('disconnected from mongodb');
};
