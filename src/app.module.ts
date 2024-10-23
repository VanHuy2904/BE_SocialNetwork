import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { CommentModule } from './modules/comment/comment.module';
import { LikeModule } from './modules/like/like.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { NotificationModule } from './modules/notification/notification.module';
import { RequestFriendController } from './modules/request-friend/request-friend.controller';
import { RequestFriendService } from './modules/request-friend/request-friend.service';
import { RequestFriendModule } from './modules/request-friend/request-friend.module';
import { ConversationController } from './modules/conversation/conversation.controller';
import { ConversationModule } from './modules/conversation/conversation.module';
import { MessageController } from './modules/message/message.controller';
import { MessageService } from './modules/message/message.service';
import { MessageModule } from './modules/message/message.module';
import * as path from 'path';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/Web'),
    UserModule,
    PostModule,
    GatewayModule,
    CommentModule,
    LikeModule,
    ServeStaticModule.forRoot({
      rootPath: 'E:/Web mang xa hoi/be_social/uploads', // Đường dẫn tuyệt đối đến thư mục uploads
    }),
    NotificationModule,
    RequestFriendModule,
    ConversationModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
