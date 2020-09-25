import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClockService } from '../clock.service';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.scss']
})
export class DigitalClockComponent implements OnInit {

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
    //this.clockService.trigger.next(1);
    this.clockService.getDateTimeObserable().subscribe(response => {
        this.clockData = response.toLocaleTimeString();
        this.thisHour = response.getHours();
        this.thisMin = response.getMinutes()
        this.thisSeconds = response.getSeconds();
      },error => {
        console.error(error);
      });
  
}

  updateTime(){
    const valueInput1 = this.hourInput.nativeElement.value
    const valueInput2 = this.minsInput.nativeElement.value
    const valueInput3 = this.secondsInput.nativeElement.value
    let newSetDate =new Date();
    newSetDate.setHours(valueInput1);
    newSetDate.setMinutes(valueInput2);
    newSetDate.setSeconds(valueInput3);
    this.callService(newSetDate);
}
 
 callService(newSetDate){
  this.clockService.updateTime(newSetDate);
}

  ngOnDestroy(): void {
    //this.
  }

}
