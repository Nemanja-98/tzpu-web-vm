import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VirtualMachineComponent } from './components/virtual-machine/virtual-machine.component';

import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    VirtualMachineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
