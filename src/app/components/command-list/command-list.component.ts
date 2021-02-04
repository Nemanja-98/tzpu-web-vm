import { Component, Inject, OnInit } from '@angular/core';
import {MatList, MatListModule, MatListOption, MatSelectionList} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { EMPTY } from 'rxjs';
import {catchError} from 'rxjs/operators'
import axios from 'axios';

import { VirtualmachinesService} from '../../services/virtualmachines/virtualmachines.service';
import { VirtualMachine } from 'src/app/models/virtual-machine.models';
//const axios = require('axios').default;

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Button } from 'protractor';
  export interface DialogData {
    ipAddress: string,
    ipAdressFrom: string,
    ipAdressTo: string,
}

@Component({
  selector: 'app-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.css']
})
export class CommandListComponent implements OnInit {
  public vmCommands : Array<string> = new Array("Turn On", "Turn Off", "Set IP", "Revert");
  public paletteColour : Array<string> = ['basic','basic','basic','basic'] ;
  public virtualMachines : Array<VirtualMachine>;
  //to move to seperate file
  public routeURL : string = '/VMOperation/';
  //http headers
  public httpOptions  = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Access-Control-Allow-Origin": "*"
    }
  }
  public newHttpOption = { headers: this.httpOptions }
  constructor(private http : HttpClient, private virtualMachinesService :VirtualmachinesService,  public dialog: MatDialog) {
   }

  ngOnInit(): void {
    this.vmCommands.forEach((element,index) => {
      this.paletteColour[index] = 'basic';
    });
    setTimeout(() => {
    this.virtualMachinesService.getMachines().subscribe(vms => {
      this.virtualMachines = vms;

    });
    }, 5000);
  }

  public onButtonClicked(event) {
    const index = this.vmCommands.indexOf(event.target.textContent);
    if(this.paletteColour[index]=='primary')
      return;
    this.paletteColour.forEach((el,i) => {
      if( index != i)
        this.paletteColour[i] = 'basic';
    });
    this.paletteColour[index] = this.paletteColour[index] == "primary" ? "basic" : "primary";
  }

  public   onButtonConfrimClicked(event){
    const operation  = document.getElementsByClassName('mat-primary');
    console.log('confirm clicked op',operation[0].childNodes[0].textContent);
    const text = operation[0].childNodes[0].textContent;
    let route = '';

    const checkboxes = document.getElementsByClassName('mat-checkbox-checked');
    console.log("CHECKBOXOVIIIIIIII",checkboxes);
    if(!checkboxes[0]){
      return
    }
    switch(text){
      case "Turn On":
        route = '/VMOperation/turnOn';
        break;
      case "Turn Off":
        route = '/VMOperation/turnOff';
        break;
      case "Set IP":
        this.openDialog();
        break;
      case "Revert":
        route = '/VMOperation/revertSnapshot';
        break;
    }
    let names : Array<string> = new Array<string>();
    this.virtualMachines.forEach((el,index) => {
      if(el.isChecked)
        names[names.length] = el.name;
    })
    console.log("route + imena",route,names);

    let list = new Array();
    names.map(el=>{
      list[list.length]={"Name" : el}
    })
    console.log("list",list);
    this.http.post<any>(route, {
      "List" : list}, this.httpOptions)
      .pipe(
        catchError(err => {
          console.log(err);
          return EMPTY;
        })
      )
      .subscribe( data =>{
        console.log("data je",data)
      });

      this.timeOutUser();

    //operations vms, turnOn, turnOff, revertSnapshot, snapshots/{vmName}
    // this.http.get<any>('/VMOperation/vms').
    // pipe(
    //   catchError(err => {
    //      console.log(err);
    //       return EMPTY;})).subscribe( data =>{
    //         console.log("data je",data)
    //       });
  }

  public onButtonCancelClicked(event){
    this.paletteColour.forEach((el,i) => {
        this.paletteColour[i] = 'basic';
    });

    const btns :any = document.querySelectorAll("button");
    btns.forEach(element => {
      if(element.checked)
        element.checked = false;
    });
  }

  public timeOutUser(){
    const btns = document.querySelectorAll("button");
    btns.forEach(element => {
      element.disabled = true;
    });

    setTimeout(() => {
      btns.forEach(element => {
        element.disabled = false;
      });
      window.location.reload();
    }, 6000);
  }

  // }
//constructor(private http: HttpClient, public dialog: MatDialog)
openDialog(): void {
  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    width: '250px',
    data: {name: "Select IP address range"}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  public isRange :boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  checkboxRangeClicked(){
    console.log("clcik");
    this.isRange=!this.isRange;
  }
}
