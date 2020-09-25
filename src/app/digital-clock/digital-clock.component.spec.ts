import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalClockComponent } from './digital-clock.component';
import { ClockService } from '../clock.service';

describe('DigitalClockComponent', () => {
  let component: DigitalClockComponent;
  let fixture: ComponentFixture<DigitalClockComponent>;
  let service: ClockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalClockComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ClockService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger service upadattimer', () => {
    const spy = spyOn(service, 'updateTime');
    component.callService(new Date());
    expect(spy).toHaveBeenCalledWith(new Date());
  });
});
