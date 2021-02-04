import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualMachineListComponent } from './virtual-machine-list.component';

describe('VirtualMachineListComponent', () => {
  let component: VirtualMachineListComponent;
  let fixture: ComponentFixture<VirtualMachineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualMachineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualMachineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
