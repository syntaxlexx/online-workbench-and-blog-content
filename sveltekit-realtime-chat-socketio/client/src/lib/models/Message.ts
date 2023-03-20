import mongoose from 'mongoose';
import type { MessageModelType } from '../types';

const messageSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	message: String,
	userName: String
}, {
	timestamps: true
});

const MessageModel = mongoose.models.Message ?? mongoose.model<MessageModelType>('Message', messageSchema);
export default MessageModel;