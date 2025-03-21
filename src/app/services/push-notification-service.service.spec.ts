import { TestBed } from '@angular/core/testing';

import { PushNotificationServiceService } from './push-notification-service.service';

describe('PushNotificationServiceService', () => {
  let service: PushNotificationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushNotificationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
