import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { VirtualTimeScheduler } from 'rxjs';
import { VirtualMachine } from 'src/app/models/virtual-machine.models';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-virtual-machine',
  templateUrl: './virtual-machine.component.html',
  styleUrls: ['./virtual-machine.component.css']
})
export class VirtualMachineComponent implements OnInit {

  @Input() virutalMachine: VirtualMachine;
  @Output() onChangeCheckbox = new EventEmitter<VirtualMachine>()

  ngOnInit(): void {
  }

  onChangeCheckBoxHandler(change: MatCheckboxChange) {
    this.virutalMachine.isChecked = change.checked
    this.onChangeCheckbox.emit(this.virutalMachine);
  }
}
