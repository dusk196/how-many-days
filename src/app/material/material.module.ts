import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Moment
import { MomentDateModule } from '@angular/material-moment-adapter';

// CDK
import { DragDropModule } from '@angular/cdk/drag-drop';

// Local imports
import { CUSTOM_DATE_FORMATS } from 'src/app/utils/date-formats';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    // Material
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
    // Moment
    MomentDateModule,
    // CDK
    DragDropModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ]
})

export class MaterialModule { }
