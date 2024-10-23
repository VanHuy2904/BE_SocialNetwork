import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from 'dto/notification.dto';
import { JwtAuthGuard } from '../jwt/jwt.guard';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notifiService: NotificationService) {}
  @Post('create-notification')
  @UseGuards(JwtAuthGuard)
  async createNotifi(@Body() NotificationDto: NotificationDto, @Request() req) {
    console.log(NotificationDto);
    console.log(req.user);

    return await this.notifiService.createNotification(
      NotificationDto,
      req.user,
    );
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async getNotification(@Request() req) {
    return await this.notifiService.getNotification(req.user._id);
  }
}
