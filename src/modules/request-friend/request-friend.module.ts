import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from 'schema/request-friend';
import { RequestFriendController } from './request-friend.controller';
import { RequestFriendService } from './request-friend.service';
import { UserSchema, user } from 'schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Request', schema: RequestSchema },
      { name: user.name, schema: UserSchema },
    ]),
  ],
  controllers: [RequestFriendController],
  providers: [RequestFriendService],
})
export class RequestFriendModule {}
