import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'User' })
export class user extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
  @Prop({ type: [Types.ObjectId], ref: 'user' })
  friend: Types.ObjectId[];
  @Prop()
  live: string;
  @Prop()
  from: string;
  @Prop()
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(user);
