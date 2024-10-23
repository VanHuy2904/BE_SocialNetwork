import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Conversations' })
export class Conversation {
  @Prop()
  Member: [];
  @Prop({ default: Date.now })
  createAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
