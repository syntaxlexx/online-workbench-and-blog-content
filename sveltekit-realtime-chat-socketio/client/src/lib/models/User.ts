import mongoose from 'mongoose';
import type { UserModelType } from '../types';

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    avatar: String,
    isActive: {type: Boolean, default: true},
    role: {type: String, default: 'user'},
    password: String,
    firstName: String,
    lastName: String,
    rgbColor: String,
    badges: [String],
}, {
    timestamps: true,
});

const UserModel = mongoose.models.User ?? mongoose.model<UserModelType>('User', UserSchema);
export default UserModel;