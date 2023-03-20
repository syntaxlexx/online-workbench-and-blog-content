import { Document, Schema } from 'mongoose';

export type SiteInfo = {
	name: string,
	logo?: string,
	email?: string,
	github: string,
	phone?: string,
	location?: string,
	address?: string,
}

export type Badge = "moderator" | "vip" | "prime" | "turbo";

export type User = {
	_id: string;
	rgbColor: string;
	username: string;
	email?: string;
	phone?: string;
	avatar?: string;
	isActive?: boolean;
	role: 'user' | 'admin';
	password?: string;
	firstName?: string;
	lastName?: string;
	badges: Badge[];
	createdAt?: Date;
	updatedAt?: Date;
}

export interface UserModelType extends User, Document {
}

export interface MessageModelType extends Document {
	_id: string;
	user: {type: Schema.Types.ObjectId, ref: 'User'}
	userName: string;
	message: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export type Credentials ={
	username: string;
	password: string;
}

export type UserSession ={
	user: UserModelType;
}


export type SocketMessagePayload = {
	message: string,
	user: {
		name: string,
		color: string,
		badges: Badge[]
	},
	createdAt: Date;
}