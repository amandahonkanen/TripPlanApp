import { TestBed, inject } from '@angular/core/testing';

import { BookingService } from './booking.service';

describe('BookingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookingService]
    });
  });

  it('should ...', inject([BookingService], (service: BookingService) => {
    expect(service).toBeTruthy();
  }));
});
