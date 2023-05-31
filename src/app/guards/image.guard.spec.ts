import { TestBed } from '@angular/core/testing';

import { ImageGuard } from './image.guard';

describe('ImageGuard', () => {
  let guard: ImageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ImageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
