import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhaoSatComponent } from './khao-sat.component';

describe('KhaoSatComponent', () => {
  let component: KhaoSatComponent;
  let fixture: ComponentFixture<KhaoSatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhaoSatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhaoSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
