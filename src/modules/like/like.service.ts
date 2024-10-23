import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from 'schema/post.schema';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel('Post')
    private postModel: mongoose.Model<Post>,
  ) {}

  async createLike(postId: string, userId: string): Promise<Post> {
    const idObject = new mongoose.Types.ObjectId(postId);
    const userIdObject = new mongoose.Types.ObjectId(userId);

    const post = await this.postModel.findOne({ _id: idObject });
    if (post && !post.like.includes(userIdObject)) {
      console.log(21321321);
      await this.postModel.findByIdAndUpdate(idObject, {
        $push: {
          like: userId,
        },
      });

      return await this.postModel.findById(idObject).populate('like').exec();
    } else {
      if (!post) throw new NotFoundException('Post not found');
      if (post.like.includes(userIdObject))
        await this.postModel.findByIdAndUpdate(idObject, {
          $pull: {
            like: userId,
          },
        });
      return await this.postModel.findById(idObject).populate('like').exec();
    }
  }
}
