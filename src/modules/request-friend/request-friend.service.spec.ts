import { Test, TestingModule } from '@nestjs/testing';
import { RequestFriendService } from './request-friend.service';

describe('RequestFriendService', () => {
  let service: RequestFriendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestFriendService],
    }).compile();

    service = module.get<RequestFriendService>(RequestFriendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
