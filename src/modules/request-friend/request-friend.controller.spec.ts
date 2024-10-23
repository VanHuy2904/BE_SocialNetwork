import { Test, TestingModule } from '@nestjs/testing';
import { RequestFriendController } from './request-friend.controller';

describe('RequestFriendController', () => {
  let controller: RequestFriendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestFriendController],
    }).compile();

    controller = module.get<RequestFriendController>(RequestFriendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
