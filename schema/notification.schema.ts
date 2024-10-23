import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { user } from './user.schema';
import { Types } from 'mongoose';

@Schema({ collection: 'Notification' })
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'Post' })
  postId: string;
  @Prop()
  postUser: string;
  @Prop({ type: Types.ObjectId, ref: 'user' })
  user: user;
  @Prop()
  type: number;
  @Prop({ default: Date.now })
  createAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
