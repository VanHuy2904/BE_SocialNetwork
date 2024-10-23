import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Conversation } from './conversations.schema';
import { user } from './user.schema';

@Schema({ collection: 'Messages' })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'Conversations' })
  conversationId: Conversation;
  @Prop({ type: Types.ObjectId, ref: 'user' })
  senderId: user;
  @Prop()
  text: string;
  @Prop({ default: Date.now })
  createAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
