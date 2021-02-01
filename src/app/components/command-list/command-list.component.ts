import { Component, OnInit } from '@angular/core';
import {MatList, MatListModule, MatListOption, MatSelectionList} from '@angular/material/list'; 
import { MatButtonModule } from '@angular/material/button'


@Component({
  selector: 'app-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.css']
})
export class CommandListComponent implements OnInit {
  public vmCommands : Array<string> = new Array("Turn On", "Turn Off", "Set IP", "Revert");
  public paletteColour : Array<string> = ['basic','basic','basic','basic'] ;
  constructor() {
   }

  ngOnInit(): void {
    this.vmCommands.forEach((element,index) => {
      this.paletteColour[index] = 'basic';
    });
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

  public onButtonConfrimClicked(event){
    console.log('confirm clicked');
  }

  public onButtonCancelClicked(event){
    this.paletteColour.forEach((el,i) => {
        this.paletteColour[i] = 'basic';
    });
  }
}