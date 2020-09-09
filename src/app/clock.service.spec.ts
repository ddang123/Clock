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
    let currentDt = new Date();
    currentDt.setHours(11);
    currentDt.setMinutes(22);
    currentDt.setSeconds(33);
    service.currentTime.next(currentDt);
    service.trigger.next(currentDt);
    setTimeout(() => {
       console.log("get result"); 
       service.getDateTime().subscribe(value =>{
        expect("11:22:34 AM").toBe(value.toLocaleTimeString());
        done();
        service.trigger.unsubscribe();
        service.currentTime.unsubscribe();
    
      });
      }, 1000);
      
  });

  // xit('should gettimer', () => {
  //   const service: ClockService = TestBed.get(ClockService);
  //   (done: DoneFn)=>{
  //     service.getDateTime().subscribe(value =>{
  //       expect(value).toBe("ooooooo");
  //       done();
  //     })
  //   }
    
  // });
});
