import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, ReplaySubject } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  defaultTime= new Date();
  trigger = new ReplaySubject(1);
  currentTime = new BehaviorSubject<any>(this.defaultTime);

  constructor() {
    this.intervalUpdate(this.defaultTime);
  }

  getDateTime() {
    return this.trigger
      .pipe(
        switchMap(
          (current) => {
            //return this.currentTime;
            return this.intervalUpdate(current);
          }
        )
      )
  }

  private intervalUpdate(currentTime) {
    setInterval(() => {        
        let newDt = this.currentTime.getValue();
        let newDate = new Date(newDt);
        newDate.setSeconds( newDate.getSeconds() + 1 );
        this.currentTime.next(newDate);        
        //return this.currentTime;
    }, 1000);
    return this.currentTime;
  }

  getDateTimeObserable() {
    return this.currentTime.asObservable();
  }

  updateTime(time: any) {
    this.currentTime.next(time); 
    //this.intervalUpdate(time);
    this.trigger.next(time);
    // this.timeStream.value = time;

  }
}
