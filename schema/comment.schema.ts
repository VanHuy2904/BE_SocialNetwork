import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { user } from './user.schema';

@Schema({ collection: 'Comment' })
export class Comment {
  @Prop()
  title: string;
  @Prop()
  user: user;
  @Prop()
  image?: string[];
  @Prop({ default: Date.now })
  createAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
