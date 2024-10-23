import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { PostDto } from 'dto/post.dto';
import mongoose from 'mongoose';
import { Post } from 'schema/post.schema';
import { user } from 'schema/user.schema';
@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post')
    private postModel: mongoose.Model<Post>,
  ) {}

  async getPost(): Promise<Post[]> {
    return await this.postModel
      .find()
      .sort({ createAt: -1 })
      .populate('like')
      .populate('comment')
      .exec();
  }

  async getPostId(id: string): Promise<Post[]> {
    return await this.postModel
      .find({
        'user._id': id,
      })
      .sort({ createAt: -1 })
      .populate('like')
      .populate('comment')
      .exec();
  }

  async createNewPost(
    postDto: PostDto,
    user: user,
    video: string,
  ): Promise<any> {
    const { title, image } = postDto;
    const post = await this.postModel.create({
      title,
      user: user,
      image,
      createAt: Date.now(),
      comment: [],
      like: [],
      video: video,
    });
    return post;
  }
}
