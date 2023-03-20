export type Badge = "moderator" | "vip" | "prime" | "turbo";

export type User = {
    _id: string;
    username: string;
    email?: string;
    phone?: string;
    avatar?: string;
    isActive?: boolean;
    role: 'user' | 'admin';
    password?: string;
    firstName?: string;
    lastName?: string;
    rgbColor: string;
    badges: Badge[];
    createdAt?: Date;
    updatedAt?: Date;
}


export type Message = {
    _id: string;
    user: User,
    userName: string;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type SocketMessagePayload = {
    message: string,
    user: {
        name: string,
        color: string,
        badges: Badge[],
    },
    createdAt: Date;
}