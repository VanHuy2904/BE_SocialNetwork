import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostDto } from 'dto/post.dto';
import { storageConfig } from 'heplers/config';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { PostService } from './post.service';
import * as path from 'path';
import * as fs from 'fs';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/get-post/:id')
  async getPostId(@Param('id') id: string) {
    return await this.postService.getPostId(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/create-post')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: storageConfig('video'),
    }),
  )
  async createPost(
    @Body() postDto: PostDto,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    try {
      const fileName = file ? file.filename : '';
      if (postDto.title !== '' || postDto.image || fileName) {
        const data = await this.postService.createNewPost(
          postDto,
          req.user,
          fileName,
        );
        return {
          data: data._id,
          status: 200,
          message: 'Thành công',
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/video/:path')
  async serveStaticFile(
    @Param('path') filePath: string,
    @Res() res: Express.Response,
  ) {
    const fullPath = path.join(
      'E:/Web mang xa hoi/be_social/uploads/video',
      filePath,
    );
    console.log(fullPath);

    (res as any).sendFile(fullPath, { root: '' });
  }
  @Get('/get-post')
  async getPost(): Promise<any> {
    return await this.postService.getPost();
  }
}
