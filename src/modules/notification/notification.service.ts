import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationDto } from 'dto/notification.dto';
import mongoose from 'mongoose';
import { Notification } from 'schema/notification.schema';
import { user } from 'schema/user.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification')
    private notificationModel: mongoose.Model<Notification>,
  ) {}

  async createNotification(
    notificationDto: NotificationDto,
    user: user,
  ): Promise<any> {
    const { postId, postUser, type } = notificationDto;
    try {
      const notificationObjectId = new mongoose.Types.ObjectId(postId);
      const notificationData = await this.notificationModel.find({
        postId: notificationObjectId,
      });

      const notificationExist = notificationData.some(
        (item) =>
          item.user._id.toString() === user._id.toString() &&
          item.postId.toString() === postId &&
          item.type === 1,
      );

      if (postUser.toString() === user._id.toString()) {
        return;
      }

      if (type === 1 && notificationExist) {
        return;
      } else {
        date: new Date();
        return await this.notificationModel.create({
          postId: notificationObjectId,
          postUser: postUser,
          user: user,
          type: type,
        });
      }
    } catch (error) {}
  }

  async getNotification(user: string): Promise<Notification[]> {
    return await this.notificationModel
      .find({ postUser: user })
      .sort({ createAt: -1 })
      .populate('postId')
      .populate('user')
      .exec();
  }
}
