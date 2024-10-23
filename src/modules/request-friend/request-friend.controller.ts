import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { RequestFriendService } from './request-friend.service';
import { RequestDto } from 'dto/request.dto';
import { user } from 'schema/user.schema';

@Controller('request-friend')
export class RequestFriendController {
  constructor(private readonly requestService: RequestFriendService) {}
  @Post('create-request')
  @UseGuards(JwtAuthGuard)
  async createRequest(@Request() req, @Body() user: RequestDto) {
    return await this.requestService.createRequest(user, req.user._id);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async getRequest(@Request() req) {
    return await this.requestService.getRequest(req.user._id);
  }
  @Get('agree-request/:userId')
  @UseGuards(JwtAuthGuard)
  async agreeRequest(
    @Param('userId') userId: string,
    RequestDto,
    @Request() req,
  ) {
    try {
      return await this.requestService.agreeRequest(userId, req.user._id);
    } catch (error) {
      return {
        error: error,
      };
    }
  }
  @Delete('delete/:userId')
  @UseGuards(JwtAuthGuard)
  async deleteRequest(@Param('userId') userId: string, @Request() req) {
    return this.requestService.deleteRequest(userId, req.user._id);
  }
}
