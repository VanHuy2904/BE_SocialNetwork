import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from '../jwt/jwt.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('post/:id')
  @UseGuards(JwtAuthGuard)
  async createLike(@Param() id: string, @Request() req) {
    try {
      console.log(id);

      return {
        data: await this.likeService.createLike(id, req.user._id),
        status: 200,
        message: 'Success',
      };
    } catch (err) {
      return {
        data: null,
        status: 404,
        message: err,
      };
    }
  }
}
