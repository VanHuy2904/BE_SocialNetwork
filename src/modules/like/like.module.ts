import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'schema/post.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
