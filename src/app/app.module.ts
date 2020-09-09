import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DigitalClockComponent } from './digital-clock/digital-clock.component';
import { AnalogClockComponent } from './analog-clock/analog-clock.component';

@NgModule({
  declarations: [
    AppComponent,
    DigitalClockComponent,
    AnalogClockComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
