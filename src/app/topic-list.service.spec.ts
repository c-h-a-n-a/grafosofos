import { TestBed } from '@angular/core/testing';

import { TopicListService } from './topic-list.service';

describe('TopicListService', () => {
  let service: TopicListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
