import { TestBed } from '@angular/core/testing';

import { QuizDataServiceService } from './quiz-data-service.service';

describe('QuizDataServiceService', () => {
  let service: QuizDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
