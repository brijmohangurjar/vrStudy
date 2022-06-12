// import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(
    // private datePipe: DatePipe,
  ) { }

  public getTimeGreetings() {
    const newDate = new Date().getHours();
    let greetingText = '';
    console.log('newDate', newDate)
    if (newDate >= 5 && newDate < 12) {
      greetingText = 'Good Morning';
    } else if (newDate >= 12 && newDate < 17) {
      greetingText = 'Good Afternoon';
    } else if (newDate >= 17) {
      greetingText = 'Good Evening';
    }
    return greetingText;
  }
}
