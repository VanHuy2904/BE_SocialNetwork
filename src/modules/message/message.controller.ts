import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from 'dto/message.dto';
import { JwtAuthGuard } from '../jwt/jwt.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post('/api/create-message')
  @UseGuards(JwtAuthGuard)
  async createMessage(@Body() messageDto: MessageDto, @Req() req) {
    return await this.messageService.createMessage(
      messageDto,
      req.user._id.toString(),
    );
  }

  @Get('/api/get-message/:id')
  @UseGuards(JwtAuthGuard)
  async getMessage(@Param('id') id: string) {
    return this.messageService.getMessage(id);
  }
}
