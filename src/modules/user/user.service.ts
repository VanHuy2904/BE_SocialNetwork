import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { SignUpDTO } from 'dto/signup.dto';
import mongoose from 'mongoose';
import { Token } from 'type/token.type';
import { user } from '../../../schema/user.schema';
// import { Not, Repository } from 'typeorm';

import { jwtConstants } from '../constants';
import { Not } from 'typeorm';
import { UserDto } from 'dto/user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(user.name)
    private userModel: mongoose.Model<user>,
    private jwtService: JwtService,
  ) {}

  async getTokens(userId: string, email: string) {
    const expiresIn = '7d';
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: expiresIn,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
      expiresIn,
    };
  }

  async singup(signup: SignUpDTO): Promise<Token> {
    const { name, email, password } = signup;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!name || !email || !password)
      throw new UnauthorizedException('Vui lòng điền đủ thông tin');
    const users = await this.userModel.findOne({ email: email });
    if (!users) {
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = await this.getTokens(user.id, user.email);

      return token;
    }
    throw new UnauthorizedException('Địa chỉ email đã tồn tại');
  }

  async finduser(email: string, password: string): Promise<Token> {
    const users = await this.userModel.findOne({ email: email });
    if (users) {
      const ispassword = await bcrypt.compare(password, users.password);
      if (ispassword) {
        const token = await this.getTokens(users.id, users.email);
        return token;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async refreshToken(id: string, email: string): Promise<any> {
    const users = await this.userModel.findOne({ email: email });
    if (users) {
      const payload = { sub: users.id, email };

      const token = await this.jwtService.signAsync(payload);
      return { accessToken: token };
    } else {
      return null;
    }
  }

  async findById(userId: string): Promise<user> {
    const user = await this.userModel
      .findById(userId)
      .populate('friend')
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async validateUser(payload: any) {
    const { _id, email, name } = payload;
    return { _id, email, name };
  }

  async getAllUser(userId: string): Promise<user[]> {
    return await this.userModel
      .find({
        _id: { $ne: userId },
      })
      .exec();
  }

  async search(userName: string): Promise<user[]> {
    return await this.userModel.find({
      name: new RegExp(userName, 'i'),
    });
  }

  async updateUser(userDto: UserDto, idUser: string) {
    console.log('idUser', idUser);

    const { name, live, from, image } = userDto;
    return await this.userModel.findOneAndUpdate(
      { _id: idUser },
      {
        $set: {
          live: live,
          name: name,
          from: from,
          image: image,
        },
      },
      { new: true },
    );
  }
}
