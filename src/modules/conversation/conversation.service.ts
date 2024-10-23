import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConversationDto } from 'dto/conversation.dto';
import mongoose from 'mongoose';
import { Conversation } from 'schema/conversations.schema';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel('Conversation')
    private conversationModel: mongoose.Model<Conversation>,
  ) {}

  async createConversation(conversation: ConversationDto) {
    const { senderId, receiverId } = conversation;
    const existingConversation = await this.conversationModel.findOne({
      $or: [
        { Member: [{ senderId, receiverId }] },
        { Member: [{ senderId: receiverId, receiverId: senderId }] },
      ],
    });
    if (existingConversation) {
      return existingConversation;
    }
    return await this.conversationModel.create({
      Member: { senderId, receiverId },
    });
  }

  async getConversation(conversation: ConversationDto) {
    const { senderId, receiverId } = conversation;
    console.log(senderId, receiverId);

    return await this.conversationModel.find({
      Member: {
        $in: { senderId },
      },
    });
  }
}
