import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VirtualMachine } from 'src/app/models/virtual-machine.models';
import { VirtualmachinesService} from '../../services/virtualmachines/virtualmachines.service';
import { of,Observable } from 'rxjs';

@Component({
  selector: 'app-virtual-machine-list',
  templateUrl: './virtual-machine-list.component.html',
  styleUrls: ['./virtual-machine-list.component.css']
})
export class VirtualMachineListComponent implements OnInit {
  public virtualMachines : Array<VirtualMachine>;
  public names : Array<string>;
  public states : Array<string>;
  constructor(private http : HttpClient, private virtualMachinesService : VirtualmachinesService) {

   }

  ngOnInit(): void {
    setTimeout(() => {
      this.virtualMachinesService.getNames().subscribe(names => {
        this.names = names;
      });

      this.virtualMachinesService.getStates().subscribe(states => {
        this.states = states;
      });

      setTimeout(() => {
      this.virtualMachinesService.getMachines().subscribe(vms => {
        this.virtualMachines = vms;
        console.log("vms",vms);
      });

    }, 5000);

    }, 10000);

  /*
  // this.http.get('/VMOperation/vms').toPromise().then((data : any) => {
  //   const res = JSON.stringify(data);
  //   const batchData = res.split('      ');
  //   for(let i = 9; i< batchData.length; i+=3){
  //     let machineName = batchData[i].split('   ')[0];
  //     this.names[this.names.length] = machineName;
  //   }

  //   // console.log("res",res);
  //   // console.log("batchData",batchData[9].split('   '));
  //   // console.log("split",batchData[9].split('   '));
  //   // console.log("this names",this.names);
  // });

  // setTimeout(() => {
  //   this.names.forEach((el)=>{
  //     this.http.get('/VMOperation/state/'+el).toPromise().then((data : any) => {
  //       const res = JSON.stringify(data);
  //       const index = res.indexOf('P');
  //       const state = res.substring(index,res.length-4);
  //       this.states[this.states.length] = state;
  //   })
  //   });
  // }, 1000);

  // setTimeout(() => {
  //   console.log("timeout za names,states 3.5",this.names,this.states);
  //   this.virtualMachines = this.names.map((vmName,index) => ({
  //     name: vmName,
  //     isChecked: false,
  //     isPoweredOn: false,
  //     state: this.states[index],
  //   } as VirtualMachine));
  // }, 3500);
  */
  }

}
