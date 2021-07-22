import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddEventComponent } from 'src/app/components/add-event/add-event.component';
import { CountdownData } from 'src/app/utils/countdown';
import { CountdownConfig } from 'src/app/utils/config';
import { DateInputs } from 'src/app/utils/date-inputs';
import { ActionEvent } from 'src/app/utils/action-events';

import * as _enums from 'src/app/utils/countdown.enum';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  configs: CountdownConfig = { darkTheme: true };
  countdowns: Array<CountdownData> = [];
  cdStr: string = '';
  selectedEvent: string = '';
  currDateTime = new Date();
  dateTimeInterval: any;

  enums = _enums;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dateTimeInterval = setInterval(() => {
      this.currDateTime = new Date();
    }, 1000);
    // For events
    const savedEvents = localStorage.getItem(this.enums.localStorage.Events);
    if (!!savedEvents) {
      try {
        const events = JSON.parse(savedEvents);
        this.countdowns = events;
        this.cdStr = savedEvents;
        this.previewEvent(this.countdowns.filter(x => x.selected)[0]);
      } catch (err: unknown) {
        localStorage.removeItem(this.enums.localStorage.Events);
      }
    }
    // For Configs
    const savedConfigs = localStorage.getItem(this.enums.localStorage.Configs);
    if (!!savedConfigs) {
      try {
        const configs: CountdownConfig = JSON.parse(savedConfigs);
        this.configs.darkTheme = configs.darkTheme;
        this.applyTheme();
      } catch (err: unknown) {
        localStorage.removeItem(this.enums.localStorage.Configs);
      }
    }
  }

  onThemeChange(): void {
    this.configs.darkTheme = !this.configs.darkTheme;
    this.applyTheme();
  }

  applyTheme(): void {
    if (this.configs.darkTheme)
      document.getElementsByTagName('body')[0].classList.remove('light-theme');
    else
      document.getElementsByTagName('body')[0].classList.add('light-theme');
    localStorage.setItem(this.enums.localStorage.Configs, JSON.stringify(this.configs));
  }

  openDialog(eventName: string, eventDate: string, id: number): void {
    const isNew = !eventName;
    const newDate = !!eventDate ? moment(new Date(eventDate), 'Do of MMMM, YYYY') : moment(new Date(), 'Do of MMMM, YYYY');
    const dialogRef = this.dialog.open(AddEventComponent, { width: '60vw', data: { name: eventName, date: newDate } });
    dialogRef.afterClosed().subscribe((result: DateInputs) => {
      if (!!result) {
        if (isNew) {
          this.countdowns.forEach(element => {
            element.selected = false;
          });
          this.countdowns.unshift({ name: result.name, date: result.date.toString(), selected: true });
          this.previewEvent(this.countdowns[0]);
        } else {
          this.countdowns[id].name = result.name;
          this.countdowns[id].date = result.date.toString();
          this.previewEvent(this.countdowns[id]);
        }
        this.cdStr = JSON.stringify(this.countdowns);
        localStorage.setItem(this.enums.localStorage.Events, this.cdStr);
      }
    });
  }

  previewEvent(event: CountdownData): void {
    this.selectedEvent = JSON.stringify(event);
  }

  eventActions(event: ActionEvent): void {
    switch (event.type) {
      case this.enums.actions.Edit:
        this.openDialog(event.events.name, event.events.date, event.id);
        break;
      case this.enums.actions.Select:
        this.previewEvent(this.countdowns[event.id]);
        break;
      case this.enums.actions.Delete:
        this.countdowns.splice(event.id, 1);
        this.cdStr = JSON.stringify(this.countdowns);
        localStorage.setItem(this.enums.localStorage.Events, this.cdStr);
        this.previewEvent(this.countdowns[0]);
        break;
      default:
        break;
    }
  }

  storeSortedEvents(events: string): void {
    localStorage.setItem(this.enums.localStorage.Events, events);
    this.countdowns = JSON.parse(events);
  }

  deleteAll(): void {
    localStorage.removeItem(this.enums.localStorage.Events);
    this.countdowns = [];
    this.cdStr = '';
    this.selectedEvent = '';
  }

  addDemo(): void {
    localStorage.removeItem(this.enums.localStorage.Events);
    localStorage.setItem(this.enums.localStorage.Events, this.enums.demo.Calender1);
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    clearInterval(this.dateTimeInterval);
  }

}
