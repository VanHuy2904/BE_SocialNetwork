import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { ConversationDto } from 'dto/conversation.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}
  @Post('/api/create-conversation')
  @UseGuards(JwtAuthGuard)
  async createConversation(@Body() conversation: ConversationDto) {
    try {
      return await this.conversationService.createConversation(conversation);
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/api/get-conversation')
  @UseGuards(JwtAuthGuard)
  async getConversation(@Req() req, @Body() conversation: ConversationDto) {
    return this.conversationService.getConversation(conversation);
  }
}
