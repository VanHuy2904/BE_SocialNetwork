import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, user } from 'schema/user.schema';
import { jwtConstants } from '../constants';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { RefreshJwtStrategy } from '../jwt/rt.strategy';
import { UserController } from './User.Controller';
import { UserService } from './User.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: user.name, schema: UserSchema }]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, RefreshJwtStrategy],
})
export class UserModule {}
