import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppService } from 'src/app/app.service';
import { DateInputs } from 'src/app/utils/date-inputs';
import { CalendarEvents } from 'src/app/utils/calendar-events';

import * as _moment from 'moment';
import * as _enums from 'src/app/utils/countdown.enum';

const moment = _moment;

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})

export class AddEventComponent implements OnInit {

  enums = _enums;

  minDate: Date = new Date();
  isHolidaysLoaded: Boolean = false;
  eventList: Array<CalendarEvents> = [];
  searchList: Array<CalendarEvents> = [];
  currentYear = new Date().getFullYear();
  searchName: String = '';
  msg: String = '';

  constructor(public dialogRef: MatDialogRef<AddEventComponent>, @Inject(MAT_DIALOG_DATA) public data: DateInputs, private appService: AppService) { }

  ngOnInit(): void {
    const holidays = localStorage.getItem('countdown-holidays');
    if (!!holidays) {
      try {
        const temp = JSON.parse(holidays);
        if (temp.year === this.currentYear) {
          this.eventList = temp.eventList;
          this.isHolidaysLoaded = true;
        } else
          this.callCalendarApi();
      } catch (err: unknown) {
        this.callCalendarApi()
      }
    } else
      this.callCalendarApi();
  }

  callCalendarApi(): void {
    this.appService.getCalendarEvents().subscribe(
      (data: any) => {
        const presentEvents = data.items.filter((x: any) => new Date(x.start.date).getFullYear() === this.currentYear);
        const futureEvents = data.items.filter((x: any) => new Date(x.start.date).getFullYear() === this.currentYear + 1);
        this.eventList.push(
          { year: this.currentYear, events: presentEvents },
          { year: this.currentYear + 1, events: futureEvents }
        );
        localStorage.setItem(this.enums.localStorage.Holidays, JSON.stringify({ year: this.currentYear, eventList: this.eventList }));
      },
      (err: Error) => {
        console.error('Error while receiving event lists: ', err)
        this.msg = 'Error while receiving event lists. Please try again later or input manually';
      },
      () => {
        this.isHolidaysLoaded = true;
      }
    );
  }

  filterEvents(): void {
    setTimeout(() => {
      this.searchList = [];
      this.searchList.push({ year: this.currentYear, events: [] }, { year: this.currentYear + 1, events: [] });
      this.searchList[0].events = this.eventList[0].events.filter(x => x.summary.toLowerCase().indexOf(this.data.name.toLowerCase()) > -1);
      this.searchList[1].events = this.eventList[1].events.filter(x => x.summary.toLowerCase().indexOf(this.data.name.toLowerCase()) > -1);
    });
  }

  selectEvent(event: any): void {
    this.data.name = event.summary;
    this.data.date = moment(new Date(event.start.date), 'Do of MMMM, YYYY')
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
