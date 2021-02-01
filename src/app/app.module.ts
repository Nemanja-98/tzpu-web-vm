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


@NgModule({
  declarations: [
    AppComponent,
    VirtualMachineComponent,
<<<<<<< HEAD
    CommandListComponent
=======
>>>>>>> 43d135eba0c9d7fd651b96addf78c40707f528a4
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    MatListModule,
    MatButtonModule,
=======
    MatCheckboxModule,
    MatCardModule,
>>>>>>> 43d135eba0c9d7fd651b96addf78c40707f528a4
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
