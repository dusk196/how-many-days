import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AddEventComponent } from './components/add-event/add-event.component';
import { ListEventsComponent } from './components/list-events/list-events.component';
import { ShowEventComponent } from './components/show-event/show-event.component';

import { MaterialModule } from './material/material.module';

import { NegToPosPipe } from './pipes/neg-to-pos.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    ListEventsComponent,
    ShowEventComponent,
    NegToPosPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
