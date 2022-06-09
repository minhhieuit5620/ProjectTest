import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMnComponent } from './company-mn.component';

describe('CompanyMnComponent', () => {
  let component: CompanyMnComponent;
  let fixture: ComponentFixture<CompanyMnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyMnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
