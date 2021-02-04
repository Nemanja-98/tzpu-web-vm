import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VirtualMachineComponent } from './components/virtual-machine/virtual-machine.component';
import { CommandListComponent } from './components/command-list/command-list.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button'

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { VirtualMachineListComponent } from './components/virtual-machine-list/virtual-machine-list.component';
import { DialogOverviewExampleDialog } from './components/command-list/command-list.component';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog'
@NgModule({
  declarations: [
    AppComponent,
    VirtualMachineComponent,
    CommandListComponent,
    VirtualMachineListComponent,
    DialogOverviewExampleDialog,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop:false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
