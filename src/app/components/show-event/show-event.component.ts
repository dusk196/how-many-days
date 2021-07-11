import { Component, Input, OnChanges } from '@angular/core';

import { CountdownData } from 'src/app/utils/countdown';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.scss']
})

export class ShowEventComponent implements OnChanges {

  @Input() selectedEvent: string = '';

  constructor() { }

  days: number = 0;
  event: CountdownData = { name: '', date: '', selected: false };

  ngOnChanges(): void {
    console.log(this.selectedEvent);
    if (!!this.selectedEvent) {
      this.event = JSON.parse(this.selectedEvent);
      this.days = this.dateDiff(new Date(), new Date(this.event.date), 'days');
    }
  }

  dateDiff(d1: Date, d2: Date, interval: string): number {
    const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24, week = day * 7;
    const date1 = Date.parse(d1.toString());
    const date2 = Date.parse(d2.toString());
    const timediff = date2 - date1;
    if (isNaN(timediff))
      return NaN;
    switch (interval) {
      case 'years':
        return d2.getFullYear() - d1.getFullYear();
      case 'months':
        return ((d2.getFullYear() * 12 + d2.getMonth()) - (d1.getFullYear() * 12 + d1.getMonth()));
      case 'weeks':
        return Math.floor(timediff / week);
      case 'days':
        return Math.floor(timediff / day) + 1;
      case 'hours':
        return Math.floor(timediff / hour);
      case 'minutes':
        return Math.floor(timediff / minute);
      case 'seconds':
        return Math.floor(timediff / second);
      default:
        return 0;
    }
  }

}
