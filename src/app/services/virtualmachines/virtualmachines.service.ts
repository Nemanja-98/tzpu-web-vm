import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VirtualMachine } from 'src/app/models/virtual-machine.models';

@Injectable({
  providedIn: 'root'
})
export class VirtualmachinesService {

  virtualMachines: Array<VirtualMachine>;

  // };
  public names : Array<string> = new Array<string>();
  public states : Array<string> = new Array<string>();
  constructor(private http : HttpClient) {
    this.http.get('/VMOperation/vms').toPromise().then((data : any) => {
      const res = JSON.stringify(data);
      const batchData = res.split('      ');
      // console.log("res",res);
      // console.log("batchData",batchData[9].split('   '));
      // console.log("split",batchData[9].split('   '));
      // console.log("this names",this.names);
      for(let i = 9; i< batchData.length; i+=3){
        let machineName = batchData[i].split('   ')[0];
        this.names[this.names.length] = machineName;
      }
    }).then(()=>{
      this.names.forEach((el)=>{
        this.http.get('/VMOperation/state/'+el).toPromise().then((data : any) => {
          const res = JSON.stringify(data);
          const index = res.indexOf('P');
          const state = res.substring(index,res.length-4);
          this.states[this.states.length] = state;
          console.log("api",this.states);
      })
    })}).then( () => {

    setTimeout(() => {
      console.log("timeout za names,states 3.5",this.names,this.states);
      this.virtualMachines = this.names.map((vmName,index) => ({
        name: vmName,
        isChecked: false,
        isPoweredOn: false,
        state: (this.states[index] ? this.states[index] : "Powered off"),
      } as VirtualMachine));
      console.log("states yooo,",this.states);
    }, 5000);


    });

    // setTimeout(() => {
    //   .then()
    //   });
    // }, 1000);

  }


  getNames() : Observable<Array<string>> {
    return of(this.names);
  }

  getStates() : Observable<Array<string>> {
    return of(this.states);
  }

  getMachines() : Observable<Array<VirtualMachine>> {
    return of(this.virtualMachines);
  }
}
