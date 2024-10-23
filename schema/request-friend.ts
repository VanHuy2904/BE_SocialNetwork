import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'Request' })
export class Request {
  @Prop({ type: Types.ObjectId, ref: 'user' })
  user: Types.ObjectId[];
  @Prop({ type: Types.ObjectId, ref: 'user' })
  userRequest: Types.ObjectId[];
  @Prop({ default: Date.now })
  createAt: Date;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
