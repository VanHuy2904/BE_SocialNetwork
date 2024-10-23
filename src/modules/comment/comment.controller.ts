import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentDto } from 'dto/comment.dto';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post('/create-comment/:id')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Body() commentDto: CommentDto,
    @Param('id') id: string,
    @Request() req,
  ): Promise<any> {
    console.log(321321321, commentDto);

    return await this.commentService.createComment(id, commentDto, req.user);
  }

  @Delete('delete-comment/:idComment/:idPost')
  @UseGuards(JwtAuthGuard)
  async deleteComment(
    @Param('idComment') idComment: string,
    @Param('idPost') idPost: string,
    @Request() req,
  ) {
    return await this.commentService.deleteComment(
      idComment,
      idPost,
      req.user._id,
    );
  }
}
