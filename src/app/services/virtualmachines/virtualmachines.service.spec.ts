import { TestBed } from '@angular/core/testing';

import { VirtualmachinesService } from './virtualmachines.service';

describe('VirtualmachinesService', () => {
  let service: VirtualmachinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualmachinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
