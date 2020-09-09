import { Component, OnInit, OnDestroy } from '@angular/core';
import { build$ } from 'protractor/built/element';
import { ClockService } from '../clock.service';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.scss']
})
 
export class AnalogClockComponent implements OnInit, OnDestroy {
  hourHandStyle; 
  minuteHandStyle; 
  secondHandStyle;

  clockData;
  thisHour;
  thisMin;
  thisSeconds;
  constructor(private clockService:ClockService) { }

  ngOnInit() {
    this.build();
  }

  private build(){
    this.clockService.getDateTime().subscribe(response => {
        this.clockData = response.hour;
        this.thisHour = response.getHours();
        this.thisMin = response.getMinutes()
        this.thisSeconds = response.getSeconds();
        this.animateAnalogClock();
      },error => {
        console.error(error);
      });
  
}

animateAnalogClock() {
  this.hourHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.thisHour * 30) + (this.thisMin * 0.5) + (this.thisSeconds * (0.5 / 60))}deg)` };
  
  this.minuteHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.thisMin * 6) + (this.thisSeconds * 0.1)}deg)` };
  
  this.secondHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${this.thisSeconds * 6}deg)` };
}

format(num: number) {
  return (num + '').length === 1 ? '0' + num : num + '';
}

updateTime(){
  console.log(888888888888888);
  let t =new Date();
  t.setHours(3);
  t.setMinutes(15);
  this.clockService.updateTime(t);
}

  ngOnDestroy(): void {
    
  }

}
