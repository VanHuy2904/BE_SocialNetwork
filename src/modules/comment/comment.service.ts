import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDto } from 'dto/comment.dto';
import mongoose from 'mongoose';
import { Comment } from 'schema/comment.schema';
import { Post } from 'schema/post.schema';
import { user } from 'schema/user.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment')
    private commentModel: mongoose.Model<Comment>,
    @InjectModel('Post')
    private postModel: mongoose.Model<Post>,
  ) {}
  async createComment(
    id: string,
    commentDto: CommentDto,
    user: user,
  ): Promise<Post> {
    const { title, image } = commentDto;
    const date = new Date();
    date: Date.now;

    const comment = await this.commentModel.create({
      title: title,
      user: user,
      image: [image],
      createAt: date,
    });
    await this.postModel.findByIdAndUpdate(id, {
      $push: {
        comment: comment._id,
      },
    });
    return await this.postModel.findById(id).populate('comment').exec();
  }

  async deleteComment(
    idComment: string,
    idPost: string,
    userId: string,
  ): Promise<Post> {
    console.log(userId);
    const commentObjectId = new mongoose.Types.ObjectId(idComment);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const postObjectId = new mongoose.Types.ObjectId(idPost);

    const comment = await this.commentModel.findOne({
      _id: commentObjectId,
      'user._id': userObjectId,
    });
    console.log(123);
    if (comment) {
      await this.commentModel.deleteOne({ _id: commentObjectId });
      await this.postModel.findOneAndUpdate(
        { _id: postObjectId },
        { $pull: { comment: commentObjectId } },
      );
      return await this.postModel
        .findById(postObjectId)
        .populate('comment')
        .exec();
    }
    throw new NotFoundException('Comment not found');
  }
}
