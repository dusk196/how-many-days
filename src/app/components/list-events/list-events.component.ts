import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { CountdownData } from 'src/app/utils/countdown';
import { ActionEvent } from 'src/app/utils/action-events';

import * as _enums from 'src/app/utils/countdown.enum';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})

export class ListEventsComponent implements OnChanges {

  @Input() countdowns: string = '';
  @Output() returnEvent = new EventEmitter<ActionEvent>();
  @Output() sortedEvents = new EventEmitter<string>();

  allCountdowns: Array<CountdownData> = [];
  selectedEvent: ActionEvent = {
    type: '',
    id: -1,
    events: {
      name: '',
      date: '',
      selected: false,
    }
  };
  enums = _enums;

  ngOnChanges(): void {
    if (!!this.countdowns) {
      this.allCountdowns = JSON.parse(this.countdowns);
    }
  }

  sorted(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.allCountdowns, event.previousIndex, event.currentIndex);
    this.sortedEvents.emit(JSON.stringify(this.allCountdowns));
  }

  actionEvents(type: string, id: number, event: CountdownData): void {
    this.selectedEvent.type = type;
    this.selectedEvent.id = id;
    this.selectedEvent.events = event;
    this.returnEvent.emit(this.selectedEvent);
  }

}
