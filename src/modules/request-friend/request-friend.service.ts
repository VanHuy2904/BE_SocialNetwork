import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RequestDto } from 'dto/request.dto';
import mongoose, { Types } from 'mongoose';
import { throwError } from 'rxjs';
import { user } from 'schema/user.schema';

@Injectable()
export class RequestFriendService {
  constructor(
    @InjectModel('Request')
    private requestModel: mongoose.Model<Request>,
    @InjectModel(user.name)
    private userModel: mongoose.Model<user>,
  ) {}

  async createRequest(users: RequestDto, userRequest: string) {
    const { user } = users;
    const userObjectId = new mongoose.Types.ObjectId(user);
    const data = await this.requestModel.findOne({
      user: userObjectId,
      userRequest: userRequest,
    });
    if (data) {
      return { message: 'Request already exists' };
    }
    return await this.requestModel.create({
      user: userObjectId,
      userRequest: userRequest,
    });
  }

  async getRequest(user: string): Promise<any> {
    console.log(
      'user data',
      await this.requestModel
        .find({
          user: user,
        })
        .populate('userRequest')
        .populate('user')
        .exec(),
    );

    return await this.requestModel
      .find({
        user: user,
      })
      .populate('userRequest')
      .sort({ createAt: -1 })
      .populate('user')
      .exec();
  }

  async agreeRequest(users: string, userId: string) {
    console.log('users', users, 'id', userId);

    if (!Types.ObjectId.isValid(users)) {
      throw new Error('Invalid user ObjectId');
    }
    const userObjectId = new mongoose.Types.ObjectId(users);
    const userSearch = await this.userModel.findById({ _id: userId });
    if (userSearch) {
      await this.userModel.findOneAndUpdate(
        { _id: userId },
        { $push: { friend: userObjectId } },
      );
      await this.userModel.findByIdAndUpdate(
        {
          _id: userObjectId,
        },
        { $push: { friend: userId } },
      );
      await this.requestModel.findOneAndDelete({
        user: userId.toString(),
        userRequest: userObjectId,
      });
      await this.deleteRequest(users.toString(), userId.toString());
      return { message: 'Agree request successful' };
    }
    throw new NotFoundException('User Not Found');
  }
  async deleteRequest(users: string, userId: string) {
    console.log('delete', users);

    const userReqObjectId = new mongoose.Types.ObjectId(users);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    return await this.requestModel.findOneAndDelete({
      user: userObjectId,
      userRequest: userReqObjectId,
    });
  }
}
