import { TestBed } from '@angular/core/testing';

import { NotifictionsService } from './notifictions.service';

describe('NotifictionsService', () => {
  let service: NotifictionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifictionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
