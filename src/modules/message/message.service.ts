import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessageDto } from 'dto/message.dto';
import mongoose from 'mongoose';
import { Message } from 'schema/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message')
    private messageModel: mongoose.Model<Message>,
  ) {}
  async createMessage(messageDto: MessageDto, senderId: string) {
    const { conversationId, text } = messageDto;

    return await this.messageModel.create({
      conversationId: conversationId,
      senderId: senderId,
      text: text,
    });
  }

  async getMessage(conversationId: string) {
    return this.messageModel
      .find({
        conversationId: conversationId,
      })
      .sort({ createAt: 1 })
      .populate('senderId')
      .exec();
  }
}
