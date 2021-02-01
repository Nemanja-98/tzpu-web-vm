import { Component, OnInit } from '@angular/core';
import { VirtualMachine } from './models/virtual-machine.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'webVms';

  mockResponse = {
    "List" : [
        {"Name" : "Ubuntu"},
        {"Name" : "Kali Linux"},
        {"Name" : "Windows"},
        {"Name" : "MAC OS"}, 
    ]
  } 

  virtualMachines: Array<VirtualMachine>; 
  virtualMachine: VirtualMachine = {
    name: 'ubuntu',
    isChecked: true,
    isPoweredOn: false,
  };

  constructor() { }

  ngOnInit(): void {
    this.virtualMachines = this.mockResponse.List.map(vmName => ({
      name: vmName.Name,
      isChecked: false,
      isPoweredOn: false,
    } as VirtualMachine));
  } 

}
