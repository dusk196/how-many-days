import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddEventComponent } from 'src/app/components/add-event/add-event.component';
import { CountdownData } from 'src/app/utils/countdown';
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

export class AppComponent implements OnInit {

  darkThemeChecked = true;
  countdowns: Array<CountdownData> = [];
  cdStr: string = '';
  selectedEvent: string = '';
  enums = _enums;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    const savedEvents = localStorage.getItem(this.enums.localStorage.Name);
    if (!!savedEvents) {
      try {
        const events = JSON.parse(savedEvents);
        this.countdowns = events;
        this.cdStr = savedEvents;
        this.previewEvent(this.countdowns.filter(x => x.selected)[0]);
      } catch (err: unknown) {
        localStorage.removeItem(this.enums.localStorage.Name);
      }
    }
  }

  onThemeChange(): void {
    this.darkThemeChecked = !this.darkThemeChecked;
    if (this.darkThemeChecked) {
      document.getElementsByTagName('body')[0].classList.remove('light-theme');
    } else {
      document.getElementsByTagName('body')[0].classList.add('light-theme');
    }
  }

  openDialog(eventName: string, eventDate: string, id: number) {
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
        localStorage.setItem(this.enums.localStorage.Name, this.cdStr);
      }
    });
  }

  previewEvent(event: CountdownData): void {
    console.log('preview', event);
    this.selectedEvent = JSON.stringify(event);
  }

  eventActions(event: ActionEvent) {
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
        localStorage.setItem(this.enums.localStorage.Name, this.cdStr);
        this.previewEvent(this.countdowns[0]);
        break;
      default:
        break;
    }
  }

  storeSortedEvents(events: string) {
    localStorage.setItem(this.enums.localStorage.Name, events);
    this.countdowns = JSON.parse(events);
  }

}
