import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { user } from './user.schema';

@Schema({ collection: 'Post' })
export class Post extends Document {
  @Prop()
  title: string;
  @Prop()
  user: user;
  @Prop()
  image?: [];
  @Prop({ default: Date.now })
  createAt: Date;
  @Prop({ type: [Types.ObjectId], ref: 'Comment' })
  comment: Types.ObjectId[];
  @Prop({ type: [Types.ObjectId], ref: 'user' })
  like: Types.ObjectId[];
  @Prop()
  video: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
