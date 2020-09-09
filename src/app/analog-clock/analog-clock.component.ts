import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('field1', null) hourInput:ElementRef;
  @ViewChild('field2',null) minsInput:ElementRef;
  @ViewChild('field3', null) secondsInput:ElementRef;
  constructor(private clockService:ClockService) { }

  ngOnInit() {
    this.build();
  }

  private build(){
    this.clockService.getDateTimeObserable().subscribe(response => {
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
  const valueInput1 = this.hourInput.nativeElement.value
  const valueInput2 = this.minsInput.nativeElement.value
  const valueInput3 = this.secondsInput.nativeElement.value
  let newSetDate =new Date();
  newSetDate.setHours(valueInput1);
  newSetDate.setMinutes(valueInput2);
  newSetDate.setSeconds(valueInput3);
  this.clockService.updateTime(newSetDate);
}

  ngOnDestroy(): void {
    this.clockService.currentTime.unsubscribe();
    this.clockService.trigger.unsubscribe();
  }

}
