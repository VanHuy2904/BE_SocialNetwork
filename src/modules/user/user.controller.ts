import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignUpDTO } from 'dto/signup.dto';
import { UserDto } from 'dto/user.dto';
import { UserService } from './User.service';
import { log } from 'console';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/login')
  async getuser(@Body() userdto: UserDto): Promise<any> {
    console.log('Login', userdto);

    try {
      if (!userdto.email || !userdto.password)
        return {
          data: null,
          message: 'Vui lòng nhập email và password!',
          status: 201,
        };
      const user = await this.userService.finduser(
        userdto.email,
        userdto.password,
      );
      if (user) {
        return {
          data: user,
          message: 'Đăng nhập thành công',
          status: 200,
        };
      } else {
        return {
          data: null,
          message: 'Sai tài khoản hoặc mật khẩu',
          status: 202,
        };
      }
    } catch (error) {
      return {
        data: null,
        message: 'Error',
        status: 404,
      };
    }
  }

  @Post('/signup')
  async signup(@Body() signupdto: SignUpDTO): Promise<any> {
    try {
      const token = await this.userService.singup(signupdto);
      return {
        data: token,
        message: 'Đăng ký thành công',
        status: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        status: 404,
      };
    }
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshToken(@Request() req) {
    console.log(req.user);
    console.log(
      await this.userService.refreshToken(req.user._id, req.user.email),
    );

    return await this.userService.refreshToken(req.user._id, req.user.email);
  }

  @Get('/user-info')
  @UseGuards(AuthGuard('jwt'))
  async getuserinfo(@Request() req) {
    return this.userService.findById(req.user._id);
  }

  @Get('allUser')
  @UseGuards(AuthGuard('jwt'))
  async getAllUser(@Request() req) {
    return await this.userService.getAllUser(req.user._id);
  }

  @Get('search/:name')
  @UseGuards(AuthGuard('jwt'))
  async search(@Param('name') userName: string) {
    return await this.userService.search(userName);
  }

  @Get('/user-info/:id')
  @UseGuards(AuthGuard('jwt'))
  async getUserDetail(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post('/update-info')
  @UseGuards(AuthGuard('jwt'))
  async updateInfo(@Body() userDto: UserDto, @Request() req): Promise<any> {
    try {
      const token = await this.userService.updateUser(userDto, req.user._id);
      return {
        data: token,
        message: 'Cập nhật thành công',
        status: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        status: 404,
      };
    }
  }
}
