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
            return this.currentTime;
          }
        )
      )
    // switchMap
    // interval(1000)
    // .pipe(

    // );
    // setInterval(() => {
    //   var time = new Date();
    //   let nowData ={};
    //   nowData['hour']=time.getHours();
    //   nowData['hour']=time.getMinutes();
    //   nowData['hour']=time.getSeconds();
    //   this.timeStream.next(nowData);
    // }, 1000);
  }

  private intervalUpdate(currentTime) {
    //this.currentTime.next(currentTime);

    //return interval(1000).
    // interval(1000).
    // pipe(
    //   tap(() => {
    //     let newDt = this.currentTime.getValue();
    //     var seconds = newDt.getSeconds() + 10;
    //     newDt = newDt + seconds;
    //     this.currentTime.next(newDt);        
    //     return this.currentTime;
    //   })
    // );
    setInterval(() => {        
        let newDt = this.currentTime.getValue();
        let newDate = new Date(newDt);
        newDate.setSeconds( newDate.getSeconds() + 1 );
        let data ={};
        // data['hour'] =newDate.getHours();
        // data['mins'] =newDate.getMinutes();
        // data['seconds'] =newDate.getSeconds()
        this.currentTime.next(newDate);        
        return this.currentTime;
    }, 1000);

  }

  // getDateTime() {
  //   return this.timeStream.asObservable();
  // }

  updateTime(time: any) {
    this.currentTime.next(time); 
    this.intervalUpdate(time);
    this.trigger.next(time);
    // this.timeStream.value = time;

  }
}
