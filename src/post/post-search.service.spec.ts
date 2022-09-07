import { Test, TestingModule } from '@nestjs/testing';
import { PostSearchService } from './post-search.service';

describe('PostSearchService', () => {
  let service: PostSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostSearchService],
    }).compile();

    service = module.get<PostSearchService>(PostSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
