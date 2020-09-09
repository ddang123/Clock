import { TestBed } from '@angular/core/testing';

import { ClockService } from './clock.service';

describe('ClockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClockService = TestBed.get(ClockService);
    expect(service).toBeTruthy();
  });

  it('run timer and checking obserable value', (done: DoneFn) => {
    const service: ClockService = TestBed.get(ClockService);
    let currentDt = new Date()
    service.trigger.next(1);
    service.getDateTime().subscribe(value =>{
      expect(value.getHours()).toBe(currentDt.getHours());
      service.trigger.unsubscribe();
      service.currentTime.unsubscribe();
      done();
    });
  });

  xit('should gettimer', () => {
    const service: ClockService = TestBed.get(ClockService);
    (done: DoneFn)=>{
      service.getDateTime().subscribe(value =>{
        expect(value).toBe("ooooooo");
        done();
      })
    }
    
  });
});
