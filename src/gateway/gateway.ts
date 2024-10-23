import { Logger, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CommentDto } from 'dto/comment.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MyGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('ChatGateway');
  private comments: any[] = [];
  private likes: any[] = [];
  private notification: any[] = [];
  private Request: any[] = [];
  private Message: any[] = [];

  @SubscribeMessage('comment')
  handleComment(client: Socket, data: any): void {
    this.comments.push(data);
    console.log('New comment:', this.comments);
    this.server.emit('new-comment', data);
  }

  @SubscribeMessage('like')
  handleLike(client: Socket, data: any): void {
    this.likes.push(data);
    console.log('New like:', this.likes);
    this.server.emit('new-like', data);
  }

  @SubscribeMessage('request')
  handleRequest(client: Socket, data: any): void {
    this.Request.push(data);
    console.log('New request:', this.Request);
    this.server.emit('new-request', data);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, data: any): void {
    this.Message.push(data);
    console.log('New request:', this.Message);
    this.server.emit('new-message', data);
  }

  @SubscribeMessage('sendNotification')
  handleSendNotification(client: Socket, data: any): void {
    this.notification.push(data);
    this.server.emit('new-notification', data);
    console.log('New notification:', this.notification);
  }

  @SubscribeMessage('notification')
  handleNotification(): void {
    console.log('dis notification:', this.notification);
    this.server.emit('display-notification', this.notification);
  }
  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket) {
    console.log(this.notification);

    console.log(`Client connected: ${client.id}`);
    this.server.emit('load-notification', this.notification);
    client.emit('comments', this.comments);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
