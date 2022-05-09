import { TestBed } from '@angular/core/testing';

import { NhomCauHoiService } from './nhom-cau-hoi.service';

describe('NhomCauHoiService', () => {
  let service: NhomCauHoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhomCauHoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
