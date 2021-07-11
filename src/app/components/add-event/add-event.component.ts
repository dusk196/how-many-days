import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DateInputs } from 'src/app/utils/date-inputs';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})

export class AddEventComponent {

  minDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<AddEventComponent>, @Inject(MAT_DIALOG_DATA) public data: DateInputs) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
