import { TestBed } from '@angular/core/testing';

import { RefreshJwtInterceptor } from './refresh-jwt.interceptor';

describe('RefreshJwtInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RefreshJwtInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RefreshJwtInterceptor = TestBed.inject(RefreshJwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
