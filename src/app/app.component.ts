import { Component, OnInit } from '@angular/core';
import { VirtualMachine } from './models/virtual-machine.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'webVms';
  public showCommands : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  displayCommands(){
    console.log("clicked");
    this.showCommands = true;
  }

}
