import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotKhaoSatComponent } from './dot-khao-sat.component';

describe('DotKhaoSatComponent', () => {
  let component: DotKhaoSatComponent;
  let fixture: ComponentFixture<DotKhaoSatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotKhaoSatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotKhaoSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
